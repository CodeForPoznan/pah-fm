from datetime import date
import json

from django.contrib.auth import get_user_model
from django.test import override_settings
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITransactionTestCase

from fleet_management.models import Car, Drive, Passenger, Project, VerificationToken
from fleet_management.factories import DriveFactory


class DrivesApiTest(APITransactionTestCase):

    def create_passenger(self, first_name, last_name, email):
        return Passenger.objects.create(
            first_name=first_name,
            last_name=last_name,
            email=email,
        )

    def setUp(self):
        self.url = reverse('drives')
        self.passengers = [
            self.create_passenger('Mike', 'Melnik', 'mike@melnik.com'),
            self.create_passenger('Mykhailo', 'Возняк', 'mik@bo.uk'),
        ]
        self.car = Car.objects.create(
            plates='FOO 129338',
            fuel_consumption=8.2,
        )
        self.project = Project.objects.create(
            title='Project title',
            description='Project description',
        )

        self.driver = get_user_model().objects.create_user(
            username='Admin',
            first_name='John',
            last_name='Michaelson',
            email='me@me.com',
            password='XXXXXXXXXXX',
        )
        self.drives = [
            Drive.objects.create(
                car=self.car,
                driver=self.driver,
                date=date.today(),
                start_mileage=200,
                end_mileage=12123,
                description='',
                start_location='Poznan',
                end_location='Warsaw',
                project=self.project,
            )
        ]
        self.drives[0].passengers.set(self.passengers)
        self.drives[0].save()

    def test_401_for_unlogged_user(self):
        res = self.client.get(self.url)
        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_get_all_drives(self):
        self.client.force_login(self.driver)
        res = self.client.get(self.url)
        self.assertEqual(res.status_code, status.HTTP_200_OK)

        drives = json.loads(res.content)
        self.assertEqual(
            drives[0],
            {
                'id': self.drives[0].id,
                'date': self.drives[0].date.isoformat(),
                'startMileage': self.drives[0].start_mileage,
                'endMileage': self.drives[0].end_mileage,
                'description': self.drives[0].description,
                'car': {
                    'id': self.car.id,
                    'plates': self.car.plates,
                    'fuelConsumption': self.car.fuel_consumption,
                    'description': self.car.description,
                },
                'passengers': [
                    {
                        'id': self.passengers[0].id,
                        'lastName': self.passengers[0].last_name,
                        'firstName': self.passengers[0].first_name,
                    },
                    {
                        'id': self.passengers[1].id,
                        'lastName': self.passengers[1].last_name,
                        'firstName': self.passengers[1].first_name,
                    },
                ],
                'driver': {
                    'id': self.driver.id,
                    'username': self.driver.username,
                },
                'startLocation': 'Poznan',
                'endLocation': 'Warsaw',
                'project': {
                    'id': self.project.id,
                    'title': self.project.title,
                    'description': self.project.description,
                },
            }
        )

    def test_can_retrieve_only_my_drives(self):
        other_driver = get_user_model().objects.create_user(
            username='JessicaDownson',
            first_name='Jessica',
            last_name='Downson',
            email='crazy_jess@gmail.com',
            password='XXXXXXXXXXX',
        )
        Drive.objects.create(
            car=self.car,
            driver=other_driver,
            date=date.today(),
            start_mileage=200,
            end_mileage=12123,
            description='',
            start_location='Poznan',
            end_location='Warsaw',
            project=self.project,
        )

        self.client.force_login(self.driver)
        res = self.client.get(self.url)
        self.assertEqual(res.status_code, status.HTTP_200_OK)

        drives = json.loads(res.content)
        self.assertEqual(len(drives), 1)
        self.assertEqual(drives[0]['id'], self.drives[0].id)

    @override_settings(EMAIL_BACKEND='django.core.mail.backends.filebased.EmailBackend')
    def test_can_create_a_drive(self):
        # this test allows to verify email template
        payload = {
            'car': {
                'id': self.car.id,
            },
            'passengers': [
                {'id': self.passengers[0].id},
                {'id': self.passengers[1].id},
            ],
            'date': date.today().isoformat(),
            'startMileage': 180000,
            'endMileage': 180250,
            'description': '',
            'startLocation': 'Warsaw',
            'endLocation': 'Poznan',
            'project': {
                'id': self.project.id,
            },
        }

        self.client.force_login(self.driver)
        res = self.client.post(self.url, data=payload, format='json')

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)

        drive = Drive.objects.get(pk=res.data['id'])
        self.assertSetEqual(
            {p.id for p in drive.passengers.all()},
            {p.id for p in self.passengers},
        )
        self.assertEqual(drive.car.id, self.car.id)
        self.assertEqual(drive.date.isoformat(), res.data['date'])
        self.assertEqual(drive.start_mileage, res.data['start_mileage'])
        self.assertEqual(drive.end_mileage, res.data['end_mileage'])
        self.assertEqual(drive.description, res.data['description'])
        self.assertEqual(drive.start_location, res.data['start_location'])
        self.assertEqual(drive.end_location, res.data['end_location'])

        tokens = VerificationToken.objects.filter(drive=drive).all()

        self.assertEqual(len(tokens), 2)
        self.assertSetEqual(
            {token.passenger.id for token in tokens},
            {self.passengers[0].id, self.passengers[1].id},
        )
        self.assertSetEqual({token.is_confirmed for token in tokens}, {False, False})
        self.assertSetEqual({token.is_ok for token in tokens}, {None, None})

    def test_fuel_consumption_is_valid(self):
        drive = DriveFactory(start_mileage=100300, end_mileage=100500)
        drive.car.fuel_consumption = 9.73
        self.assertEqual(drive.fuel_consumption, 19.46)
