from django.contrib.auth.models import Group

from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from fleet_management.constants import Groups
from fleet_management.factories import UserFactory


class RefuelsApiTestCase(APITestCase):
    def setUp(self):
        self.url = reverse("projects")
        self.user = UserFactory.create(
            groups=[Group.objects.get(name=Groups.Driver.name)]
        )

    def test_401_for_unlogged_user(self):
        res = self.client.get(self.url)
        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_get_all_refuels(self):
        self.client.force_login(self.user)
        res = self.client.get(self.url)
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(0, len(res.data))
