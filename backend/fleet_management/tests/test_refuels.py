from django.contrib.auth.models import Group
from django.urls import reverse
from djmoney.money import Money
from fleet_management.api import RefuelView
from fleet_management.constants import Groups
from fleet_management.factories import CarFactory, RefuelFactory, UserFactory
from fleet_management.models import Refuel
from rest_framework import status
from rest_framework.test import APIRequestFactory, APITestCase, force_authenticate


class RefuelsApiTestCase(APITestCase):
    def setUp(self):
        self.url = reverse("refuels")
        self.user = UserFactory.create(
            groups=[Group.objects.get(name=Groups.Driver.name)]
        )
        self.refuels = RefuelFactory.create_batch(size=3)

        self.car = CarFactory.create()
        self.driver = UserFactory.create()
        self.total_cost = Money(25, "PLN")

        self.factory = APIRequestFactory()

    def test_403_for_unlogged_user(self):
        res = self.client.get(self.url)
        self.assertEqual(res.status_code, status.HTTP_403_FORBIDDEN)

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
            self.assertEqual(refuel["total_cost"], res.data[idx]["total_cost"])

    def test_create_a_refuel(self):
        payload = {
            "car": {"id": self.car.id},
            "driver": {"id": self.driver.id},
            "date": "2020-09-25",
            "current_mileage": 0,
            "refueled_liters": 5,
            "price_per_liter": 34,
            "total_cost": int(self.total_cost.amount),
            "total_cost_currency": self.total_cost.currency.code,
        }

        self.client.force_login(self.user)
        res = self.client.post(self.url, data=payload, format="json")
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)

        refuel = Refuel.objects.filter(id=res.data["id"])
        self.assertEqual(refuel.count(), 1)

        refuel = refuel[0]
        self.assertEqual(refuel.car.id, self.car.id)
        self.assertEqual(refuel.driver.id, self.driver.id)
        self.assertEqual(refuel.date.isoformat(), res.data["date"])
        self.assertEqual(refuel.current_mileage, res.data["current_mileage"])
        self.assertEqual(refuel.refueled_liters, res.data["refueled_liters"])
        self.assertEqual(refuel.price_per_liter, res.data["price_per_liter"])
        self.assertEqual(str(refuel.total_cost.amount), res.data["total_cost"])
