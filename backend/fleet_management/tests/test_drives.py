from django.contrib.auth.models import Group
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from fleet_management.constants import Groups
from fleet_management.factories import (
    DriveFactory,
    CarFactory,
    ProjectFactory,
    UserFactory,
)
from fleet_management.models import Drive


class DrivesApiTestCase(APITestCase):
    def setUp(self):
        self.url = reverse("drives")
        self.drivers_group = Group.objects.get(name=Groups.Driver.name)
        self.passengers_group = Group.objects.get(name=Groups.Passenger.name)

        self.car = CarFactory.make(id=29)
        self.project = ProjectFactory.make(id=42, country="UA")
        self.driver = UserFactory.make(id=51, groups=[self.drivers_group])
        self.passenger = UserFactory.make(
            id=35,
            rsa_pub_e=257,
            rsa_priv_d=30593,
            rsa_modulus_n=50927,
            groups=[self.passengers_group],
        )
        self.drives = DriveFactory.make_batch(
            size=10, driver=self.driver, passenger=self.passenger
        )

    def test_401_for_unlogged_user(self):
        res = self.client.get(self.url)
        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_can_retrieve_only_my_drives(self):
        new_driver = UserFactory.make(groups=[self.drivers_group])
        DriveFactory.make_batch(4, driver=new_driver, passenger=self.passenger)

        self.client.force_login(self.driver)
        res = self.client.get(self.url)
        self.assertEqual(res.status_code, status.HTTP_200_OK)

        drives = res.data
        self.assertEqual(len(drives), len(self.drives))
        self.assertEqual({d["driver"]["id"] for d in drives}, {self.driver.id})

        for drive in drives:
            self.assertEqual(drive["driver"]["id"], self.driver.id)

    def test_can_create_a_verified_drive(self):
        payload = {
            "car": {"id": self.car.id},
            "project": {"id": self.project.id},
            "passengers": [{"id": self.passenger.id}],
            "date": "2019-12-06",
            "startMileage": 180000,
            "endMileage": 180250,
            "description": "",
            "startLocation": "Warsaw",
            "endLocation": "Poznan",
            "signature": 2182,
        }

        self.client.force_login(self.driver)
        res = self.client.post(self.url, data=payload, format="json")

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        drive = Drive.objects.filter(id=res.data["id"])
        self.assertEqual(drive.count(), 1)

        drive = drive[0]
        self.assertTrue(drive.is_verified)
        self.assertEqual(drive.car.id, self.car.id)
        self.assertEqual(drive.project.id, self.project.id)
        self.assertEqual(drive.passenger.id, self.passenger.id)
        self.assertEqual(drive.date.isoformat(), res.data["date"])
        self.assertEqual(drive.start_mileage, res.data["start_mileage"])
        self.assertEqual(drive.end_mileage, res.data["end_mileage"])
        self.assertEqual(drive.description, res.data["description"])
        self.assertEqual(drive.start_location, res.data["start_location"])
        self.assertEqual(drive.end_location, res.data["end_location"])

    def test_can_create_an_unverified_drive(self):
        payload = {
            "car": {"id": self.car.id},
            "project": {"id": self.project.id},
            "passengers": [{"id": self.passenger.id}],
            "date": "2019-12-07",
            "startMileage": 180000,
            "endMileage": 180250,
            "description": "",
            "startLocation": "Poznan",
            "endLocation": "Warsaw",
            # we don't send signature (unverified drive)
        }

        self.client.force_login(self.driver)
        res = self.client.post(self.url, data=payload, format="json")

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        drive = Drive.objects.get(id=res.data["id"])
        self.assertFalse(drive.is_verified)

    def test_fuel_consumption_is_valid(self):
        drive = DriveFactory.make(start_mileage=100300, end_mileage=100500)
        drive.car.fuel_consumption = 9.73
        self.assertEqual(drive.fuel_consumption, 19.46)

    def test_diff_mileage(self):
        drive = DriveFactory.make(start_mileage=100300, end_mileage=100800)
        self.assertEqual(drive.diff_mileage, 500)
