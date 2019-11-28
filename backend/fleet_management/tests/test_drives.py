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
        self.passenger = UserFactory.create(
            groups=[Group.objects.get(name=Groups.Passenger.name)]
        )
        self.car = CarFactory()
        self.project = ProjectFactory(country="UA")
        self.driver = UserFactory.create(
            groups=[Group.objects.get(name=Groups.Driver.name)]
        )
        self.drives = DriveFactory.create_batch(
            size=10, driver=self.driver, passenger=self.passenger
        )

    def test_401_for_unlogged_user(self):
        res = self.client.get(self.url)
        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_can_retrieve_only_my_drives(self):
        new_driver = UserFactory(groups=Group.objects.filter(name=Groups.Driver.name))
        DriveFactory.create_batch(size=4, driver=new_driver, passenger=self.passenger)
        self.client.force_login(self.driver)
        res = self.client.get(self.url)
        drives = res.data
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(len(drives), len(self.drives))
        self.assertEqual({d["driver"]["id"] for d in drives}, {self.driver.id})
        for drive in drives:
            self.assertEqual(drive["driver"]["id"], self.driver.id)

    def test_can_create_a_drive(self):
        new_car = CarFactory(id=41)
        new_passenger = UserFactory(
            id=41, rsa_modulus_n=50927, rsa_pub_e=257, rsa_priv_d=30593
        )
        new_project = ProjectFactory(id=1337)
        payload = {
            "car": {"id": new_car.id},
            "passengers": [{"id": new_passenger.id}],
            "date": "2019-11-28",
            "startMileage": 180000,
            "endMileage": 180250,
            "description": "",
            "startLocation": "Warsaw",
            "endLocation": "Poznan",
            "project": {"id": new_project.id},
            "signature": 27375,
        }

        self.client.force_login(self.driver)

        res = self.client.post(self.url, data=payload, format="json")
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)

        drive = Drive.objects.get(pk=res.data["id"])

        self.assertTrue(drive.is_verified)
        self.assertEqual(drive.car.id, new_car.id)
        self.assertEqual(drive.project.id, new_project.id)
        self.assertEqual(drive.passenger.id, new_passenger.id)
        self.assertEqual(drive.date.isoformat(), res.data["date"])
        self.assertEqual(drive.start_mileage, res.data["start_mileage"])
        self.assertEqual(drive.end_mileage, res.data["end_mileage"])
        self.assertEqual(drive.description, res.data["description"])
        self.assertEqual(drive.start_location, res.data["start_location"])
        self.assertEqual(drive.end_location, res.data["end_location"])

        # "new" drive (modified data) but with the same signature => unverified drive
        payload["date"] = "2019-11-29"
        payload["startMileage"] = 180255
        payload["endMileage"] = 19923414
        drive_id = self.client.post(self.url, data=payload, format="json").data["id"]
        self.assertFalse(Drive.objects.get(pk=drive_id).is_verified)

    def test_fuel_consumption_is_valid(self):
        drive = DriveFactory(start_mileage=100300, end_mileage=100500)
        drive.car.fuel_consumption = 9.73
        self.assertEqual(drive.fuel_consumption, 19.46)

    def test_diff_mileage(self):
        drive = DriveFactory(start_mileage=100300, end_mileage=100800)
        self.assertEqual(drive.diff_mileage, 500)

    def test_form_as_hash(self):
        form = {
            "date": "2019-11-28",
            "startLocation": "Warsaw",
            "endLocation": "Poznan",
            "signature": 46299,
        }
        hashed_form = Drive.form_as_hash(form)
        self.assertEqual(hashed_form, 104465)

        # modification of the signature should not affect hash value
        form["signature"] = 1337
        self.assertEqual(Drive.form_as_hash(form), 104465)

