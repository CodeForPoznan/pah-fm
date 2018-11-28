from datetime import date
import json

from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITransactionTestCase

from fleet_management.models import Car, Drive, Passenger


class DrivesApiTest(APITransactionTestCase):

    def create_passenger(self, first_name, last_name):
        return Passenger.objects.create(
            first_name=first_name,
            last_name=last_name,
        )

    def setUp(self):
        self.maxDiff = None
        self.url = reverse('drives')
        self.passengers = [
            self.create_passenger('Mike', 'Melnik'),
            self.create_passenger('Mykhailo', 'Возняк'),
        ]
        self.car = Car.objects.create(
            plates='FOO 129338',
            mileage_unit=Car.KILOMETERS,
            fuel_consumption=8.2,
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
                description=''
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
                }
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
            description=''
        )

        self.client.force_login(self.driver)
        res = self.client.get(self.url)
        self.assertEqual(res.status_code, status.HTTP_200_OK)

        drives = json.loads(res.content)
        self.assertEqual(len(drives), 1)
        self.assertEqual(drives[0]['id'], self.drives[0].id)
