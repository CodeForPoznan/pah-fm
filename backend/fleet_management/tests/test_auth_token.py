from django.contrib.auth.models import Group
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from fleet_management.constants import Groups
from fleet_management.factories import UserFactory


class AuthTokenApiTestCase(APITestCase):
    def setUp(self):
        self.url = reverse("jwt")
        self.driver = UserFactory.create(
            groups=[Group.objects.get(name=Groups.Driver.name)]
        )
        self.passenger = UserFactory.create(
            groups=[Group.objects.get(name=Groups.Passenger.name)]
        )

    def test_successful_user_login(self):
        driver_res = self.client.post(
            self.url,
            data={"username": self.driver.username, "password": "pass123"},
            format="json",
        )
        self.assertEqual(driver_res.status_code, status.HTTP_200_OK)
        self.assertContains(driver_res, "token")

        passenger_res = self.client.post(
            self.url,
            data={"username": self.passenger.username, "password": "pass123"},
            format="json",
        )
        self.assertEqual(passenger_res.status_code, status.HTTP_200_OK)
        self.assertContains(passenger_res, "token")

    def test_unsuccessful_user_login(self):
        res = self.client.post(
            self.url,
            data={"username": self.driver.username, "password": "badpassword"},
            format="json",
        )
        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)
