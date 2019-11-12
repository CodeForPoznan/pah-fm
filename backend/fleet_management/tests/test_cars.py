from urllib.parse import urlencode

from django.contrib.auth.models import Group
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from fleet_management.constants import Groups
from fleet_management.factories import CarFactory, UserFactory


class CarsApiTest(APITestCase):
    def setUp(self):
        self.url = reverse("cars")
        self.user = UserFactory()
        self.user.groups.set(Group.objects.filter(name=Groups.Driver.name))
        self.cars = CarFactory.create_batch(3, country=self.user.country)

    def test_401_for_unlogged_user(self):
        res = self.client.get(self.url)
        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_get_all_cars(self):
        self.client.force_login(self.user)
        res = self.client.get(self.url)
        self.cars.sort(key=lambda car: car.plates)
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        for car in zip(self.cars, res.data):
            self.assertEqual(car[0].id, car[1]["id"])

    def test_search_by_plate(self):
        self.client.force_login(self.user)
        url_params = urlencode({"search": self.cars[0].plates})
        res = self.client.get(f"{self.url}?{url_params}")
        cars = res.data
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(len(cars), 1)
        self.assertEqual(cars[0]["id"], self.cars[0].id)
