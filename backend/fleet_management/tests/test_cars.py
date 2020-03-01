from urllib.parse import urlencode

from django.contrib.auth.models import Group
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from fleet_management.constants import Groups
from fleet_management.factories import CarFactory, UserFactory


class CarsApiTestCase(APITestCase):
    def setUp(self):
        self.url = reverse("cars")
        self.user = UserFactory.make(
            groups=[Group.objects.get(name=Groups.Driver.name)]
        )
        self.cars = CarFactory.make_batch(size=3, country=self.user.country)

    def test_401_for_unlogged_user(self):
        res = self.client.get(self.url)
        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_get_all_cars(self):
        self.client.force_login(self.user)
        res = self.client.get(self.url)
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(len(self.cars), len(res.data))
        for idx, car in enumerate(sorted(res.data, key=lambda car: car["id"])):
            self.assertEqual(car["plates"], self.cars[idx].plates)

    def test_search_by_plate(self):
        self.client.force_login(self.user)
        url_params = urlencode({"search": self.cars[0].plates})
        res = self.client.get(f"{self.url}?{url_params}")
        cars = res.data
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(len(cars), 1)
        self.assertEqual(cars[0]["id"], self.cars[0].id)
