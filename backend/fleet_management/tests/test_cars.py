from urllib.parse import urlencode

from django.contrib.auth.models import Group
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIRequestFactory, APITestCase, force_authenticate

from fleet_management.api import CarListView
from fleet_management.constants import Groups
from fleet_management.factories import CarFactory, UserFactory


class CarsApiTestCase(APITestCase):
    def setUp(self):
        self.url = reverse("cars")
        self.user = UserFactory.create(
            groups=[Group.objects.get(name=Groups.Driver.name)]
        )
        self.cars = CarFactory.create_batch(size=3, country=self.user.country)
        self.factory = APIRequestFactory()

    def test_403_for_unlogged_user(self):
        res = self.client.get(self.url)
        self.assertEqual(res.status_code, status.HTTP_403_FORBIDDEN)

    def test_get_all_cars(self):
        request = self.factory.get(self.url)
        force_authenticate(request, user=self.user)
        res = CarListView.as_view()(request)
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(len(self.cars), len(res.data))
        for idx, car in enumerate(sorted(res.data, key=lambda c: c["id"])):
            self.assertEqual(car["plates"], self.cars[idx].plates)

    def test_search_by_plate(self):
        self.client.force_login(self.user)
        searched_car = self.cars[0]
        url_params = urlencode({"search": searched_car.plates})
        res = self.client.get(f"{self.url}?{url_params}")
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        returned_ids = map(lambda c: c["id"], res.data)
        self.assertIn(searched_car.id, returned_ids)
        self.assertTrue(len(res.data))
