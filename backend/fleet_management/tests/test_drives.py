from datetime import date

from django.contrib.auth.models import Group
from django.test import override_settings
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
from fleet_management.serializers import DriveSerializer


class DrivesApiTest(APITestCase):
    def setUp(self):
        self.url = reverse("drives")
        self.passengers = PassengerFactory.create_batch(size=10)
        self.car = CarFactory()
        self.project = ProjectFactory(country="UA")
        self.driver = UserFactory()
        self.driver.groups.set(Group.objects.filter(name=Groups.Driver.name))

        self.drives = DriveFactory.create_batch(
            size=10,
            car=self.car,
            driver=self.driver,
            date=date.today().isoformat(),
            project=self.project,
        )

        self.drives[0].passengers.set(self.passengers)

        self.payload = {
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

    def test_401_for_unlogged_user(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_can_retrieve_only_my_drives(self):
        new_driver = UserFactory()

        new_driver.groups.set(Group.objects.filter(name=Groups.Driver.name))

        new_drive = [
            DriveFactory(
                car=self.car, driver=new_driver, date=date.today(), project=self.project
            )
        ]

        self.client.force_login(new_driver)
        response = self.client.get(self.url)
        drives = response.data
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(drives), 1)
        self.assertEqual(drives[0]["id"], new_drive[0].id)

    @override_settings(EMAIL_BACKEND="django.core.mail.backends.filebased.EmailBackend")
    def test_can_create_a_drive(self):
        """This test allows to verify email template."""
        self.client.force_login(self.driver)
        res = self.client.post(self.url, data=self.payload, format="json")
        drive = Drive.objects.get(pk=res.data["id"])
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        self.assertEqual(DriveSerializer(drive).data, res.data)

    def test_fuel_consumption_is_valid(self):
        drive = DriveFactory(start_mileage=100300, end_mileage=100500)
        drive.car.fuel_consumption = 9.73
        self.assertEqual(drive.fuel_consumption, 19.46)
