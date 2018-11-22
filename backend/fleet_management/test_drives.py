from datetime import datetime

from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITransactionTestCase

from fleet_management.models import Car, Drive, Passenger
from fleet_management.serializers import CarSerializer, Passenger, UserSerializer


class DrivesApiTest(APITransactionTestCase):

    def create_passenger(self, first_name, last_name):
        return Passenger.objects.create(
            first_name=first_name,
            last_name=last_name,
        )

    def setUp(self):
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
                date=datetime.today(),
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

        drives = res.json()
        self.assertEqual(
            drives[0],
            {
                'date': self.drives[0].date.isoformat(),
                'startMileage': self.drives[0].start_mileage,
                'endMileage': self.drives[0].end_mileage,
                'description': self.drives[0].description,
                'car': CarSerializer(self.drives[0].car).data,
                'passengers': Passenger(
                    self.drives[0].passengers, many=True,
                ).data,
                'driver': UserSerializer(self.driver).data,
            }
        )
