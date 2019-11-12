from datetime import date

from django.contrib.auth.models import Group
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from fleet_management.constants import Groups
from fleet_management.factories import (
    DriveFactory,
    PassengerFactory,
    CarFactory,
    ProjectFactory,
    UserFactory,
)
from fleet_management.models import Drive


class DrivesApiTest(APITestCase):
    def setUp(self):
        self.url = reverse("drives")
        self.passengers = PassengerFactory.create_batch(size=10)
        self.car = CarFactory()
        self.project = ProjectFactory(country="UA")
        self.driver = UserFactory()
        self.driver_group = Group.objects.filter(name=Groups.Driver.name)
        self.driver.groups.set(self.driver_group)
        self.drives = DriveFactory.create_batch(
            size=10, driver=self.driver, passengers=self.passengers
        )

    def test_401_for_unlogged_user(self):
        res = self.client.get(self.url)
        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_can_retrieve_only_my_drives(self):
        new_driver = UserFactory()
        new_driver.groups.set(self.driver_group)
        DriveFactory.create_batch(size=4, driver=new_driver, passengers=self.passengers)
        self.client.force_login(self.driver)
        res = self.client.get(self.url)
        drives = res.data
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(len(drives), len(self.drives))
        for drive in drives:
            self.assertEqual(drive["driver"]["id"], self.driver.id)

    def test_can_create_a_drive(self):
        payload = {
            "car": {"id": self.car.id},
            "passengers": [
                {"id": self.passengers[0].id},
                {"id": self.passengers[1].id},
            ],
            "date": date.today().isoformat(),
            "startMileage": 180000,
            "endMileage": 180250,
            "description": "",
            "startLocation": "Warsaw",
            "endLocation": "Poznan",
            "project": {"id": self.project.id},
        }
        self.client.force_login(self.driver)
        res = self.client.post(self.url, data=payload, format="json")
        drive = Drive.objects.filter(pk=res.data["id"])
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        self.assertEqual(drive.count(), 1)
        drive = drive[0]
        self.assertSetEqual(
            {p.id for p in drive.passengers.all()},
            {p.id for p in self.passengers[0:2]}
        )
        self.assertEqual(drive.car.id, self.car.id)
        self.assertEqual(drive.date.isoformat(), res.data["date"])
        self.assertEqual(drive.start_mileage, res.data["start_mileage"])
        self.assertEqual(drive.end_mileage, res.data["end_mileage"])
        self.assertEqual(drive.description, res.data["description"])
        self.assertEqual(drive.start_location, res.data["start_location"])
        self.assertEqual(drive.end_location, res.data["end_location"])

    def test_fuel_consumption_is_valid(self):
        drive = DriveFactory(start_mileage=100300, end_mileage=100500)
        drive.car.fuel_consumption = 9.73
        self.assertEqual(drive.fuel_consumption, 19.46)
