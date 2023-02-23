from django.contrib.auth.models import Group
from django.urls import reverse
from fleet_management.constants import Groups
from fleet_management.factories import UserFactory
from rest_framework import status
from rest_framework.test import APITestCase


class MeApiTestCase(APITestCase):
    def setUp(self):
        self.url = reverse("me")
        self.user = UserFactory.create(
            username="driver@codeforpoznan.pl",
            groups=[Group.objects.get(name=Groups.Driver.name)],
        )

    def test_403_for_unlogged_user(self):
        res = self.client.get(self.url)
        self.assertEqual(res.status_code, status.HTTP_403_FORBIDDEN)

    def test_get_me(self):
        self.client.force_login(self.user)
        res = self.client.get(self.url)
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(len(res.data), 6)  # no. of keys
        self.assertEqual(res.data["id"], self.user.id)
        self.assertEqual(res.data["username"], self.user.username)
        self.assertEqual(len(res.data["groups"]), 1)
        self.assertEqual(res.data["groups"][0]["name"], Groups.Driver.name)

    def test_get_me_with_two_groups(self):
        self.user.groups.add(Group.objects.get(name=Groups.Passenger.name))
        self.client.force_login(self.user)
        res = self.client.get(self.url)
        self.assertEqual(len(res.data["groups"]), 2)
        self.assertEqual(res.data["groups"][0]["name"], Groups.Passenger.name)
        self.assertEqual(res.data["groups"][1]["name"], Groups.Driver.name)
