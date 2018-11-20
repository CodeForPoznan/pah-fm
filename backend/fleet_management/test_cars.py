from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITransactionTestCase

from fleet_management.models import Car


class CarsApiTest(APITransactionTestCase):

    def setUp(self):
        self.url = reverse('cars')

    @classmethod
    def setUpClass(cls):
        Car(
            plates='FOO 129338',
            mileage_unit=Car.KILOMETERS,
            fuel_consumption=8.2,
        ).save()
        Car(
            plates='BAR 119922',
            mileage_unit=Car.MILES,
            fuel_consumption=15.0,
            description='A big and comfortable car - великий і комфортний автомобіль',
        ).save()

    def test_401_for_unlogged_user(self):
        res = self.client.get(self.url)
        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_get_all_cars(self):
        pass

    def test_search_by_plate(self):
        pass
