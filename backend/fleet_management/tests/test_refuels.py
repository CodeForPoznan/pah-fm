from django.contrib.auth.models import Group

from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from fleet_management.constants import Groups
from fleet_management.factories import UserFactory, RefuelFactory


class RefuelsApiTestCase(APITestCase):
    def setUp(self):
        self.url = reverse("refuels")
        self.user = UserFactory.create(
            groups=[Group.objects.get(name=Groups.Driver.name)]
        )
        self.refuels = RefuelFactory.create_batch(size=3)

    def test_401_for_unlogged_user(self):
        res = self.client.get(self.url)
        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_get_all_refuels(self):
        self.client.force_login(self.user)
        res = self.client.get(self.url)
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(len(self.refuels), len(res.data))
        for idx, refuel in enumerate(sorted(res.data, key=lambda p: p["id"])):
            self.assertEqual(refuel["car"], res.data[idx]["car"])
            self.assertEqual(refuel["date"], res.data[idx]["date"])
            self.assertEqual(
                refuel["current_mileage"], res.data[idx]["current_mileage"]
            )
            self.assertEqual(
                refuel["refueled_liters"], res.data[idx]["refueled_liters"]
            )
            self.assertEqual(
                refuel["price_per_liter"], res.data[idx]["price_per_liter"]
            )
            self.assertEqual(refuel["currency"], res.data[idx]["currency"])
