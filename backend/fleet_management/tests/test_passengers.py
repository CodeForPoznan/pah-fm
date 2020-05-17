from urllib.parse import urlencode

from django.contrib.auth.models import Group
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from fleet_management.constants import Groups
from fleet_management.factories import UserFactory


class PassengersApiTestCase(APITestCase):
    def setUp(self):
        self.url = reverse("passengers")
        self.user = UserFactory.make(groups=[Group.objects.get(name=Groups.Driver.name)])
        self.passengers = UserFactory.make_batch(
            size=5,
            country=self.user.country,
            groups=[Group.objects.get(name=Groups.Passenger.name)]
        )

    def test_401_for_unlogged_user(self):
        res = self.client.get(self.url)
        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_get_all_passengers(self):
        self.client.force_login(self.user)
        res = self.client.get(self.url)
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(len(self.passengers), len(res.data))
        for idx, passenger in enumerate(sorted(res.data, key=lambda p: p["id"])):
            self.assertEqual(passenger["id"], self.passengers[idx].id)
            self.assertEqual(passenger["first_name"], self.passengers[idx].first_name)
            self.assertEqual(passenger["last_name"], self.passengers[idx].last_name)

    def test_search_passengers_by_first_name(self):
        self.client.force_login(self.user)
        url_params = urlencode({"search": self.passengers[0].first_name})
        res = self.client.get(f"{self.url}?{url_params}")
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(len(res.data), 1)
        self.assertEqual(res.data[0]["id"], self.passengers[0].id)
