from urllib.parse import urlencode

from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITransactionTestCase

from fleet_management.models import Car


class CarsApiTest(APITransactionTestCase):

    def setUp(self):
        self.url = reverse('cars')
        self.cars = [
            Car.objects.create(
                plates='FOO 129338',
                fuel_consumption=8.2,
            ),
            Car.objects.create(
                plates='BAR 119922',
                fuel_consumption=15.0,
                description='A big and comfortable car - великий '
                            'і комфортний автомобіль',
            ),
        ]
        self.password = 'xxxxxxxxxxxxx'
        self.user = get_user_model().objects.create_user(
            username='Admin',
            first_name='John',
            last_name='Michaelson',
            email='me@me.com',
            password=self.password,
        )

    def test_401_for_unlogged_user(self):
        res = self.client.get(self.url)
        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_get_all_cars(self):
        self.client.force_login(self.user)
        res = self.client.get(self.url)
        self.assertEqual(res.status_code, status.HTTP_200_OK)

        cars = res.json()
        self.assertEqual(len(cars), 2)
        self.assertDictEqual(
            cars[0],
            {
                'id': self.cars[1].id,
                'plates': self.cars[1].plates,
                'fuelConsumption': self.cars[1].fuel_consumption,
                'description': self.cars[1].description,
            },
        )
        self.assertDictEqual(
            cars[1],
            {
                'id': self.cars[0].id,
                'plates': self.cars[0].plates,
                'fuelConsumption': self.cars[0].fuel_consumption,
                'description': self.cars[0].description,
            },
        )

    def test_search_by_plate(self):
        self.client.force_login(self.user)
        url_params = urlencode({'search': '129'})
        res = self.client.get(f'{self.url}?{url_params}')

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        cars = res.json()
        self.assertEqual(len(cars), 1)
        self.assertEqual(cars[0]['id'], self.cars[0].id)
