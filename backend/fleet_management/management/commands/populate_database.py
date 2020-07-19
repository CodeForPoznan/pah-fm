import random

from django.core.management.base import BaseCommand
from django.contrib.auth.models import Group
from django.db import transaction
from tqdm import tqdm

from fleet_management.constants import Groups
from fleet_management.factories import (
    CarFactory,
    DriveFactory,
    ProjectFactory,
    UserFactory,
)


class Command(BaseCommand):
    """Populate database with fake items."""

    help = "Populates database with fake items."

    @transaction.atomic
    def handle(self, *args, **options):
        driver_group = Group.objects.get(name=Groups.Driver.name)
        passenger_group = Group.objects.get(name=Groups.Passenger.name)

        def info(message):
            self.stdout.write(self.style.SUCCESS(message))

        cars = [
            CarFactory.make(
                plates="UA000000",
                description="Default Car",
                fuel_consumption=10.0,
                country="UA",
            ),
        ]
        info("Creating 5 random cars")
        for _ in tqdm(range(5)):
            cars.append(CarFactory.make())

        drivers = [
            UserFactory.make(
                username="driver@codeforpoznan.pl",
                email="driver@codeforpoznan.pl",
                first_name="Default",
                last_name="Driver",
                country="UA",
                groups=[driver_group],
            ),
        ]
        info("Creating 5 random drivers")
        for _ in tqdm(range(5)):
            drivers.append(UserFactory.make(groups=[driver_group]))

        passengers = [
            UserFactory.make(
                username="passenger@codeforpoznan.pl",
                email="passenger@codeforpoznan.pl",
                first_name="Default",
                last_name="Passenger",
                country="UA",
                groups=[passenger_group],
            ),
        ]
        info("Creating 10 passengers")
        for _ in tqdm(range(10)):
            passengers.append(UserFactory.make(groups=[passenger_group]))

        projects = [
            ProjectFactory.make(
                title="Default Project", description="Default Project", country="UA",
            )
        ]
        info("Creating 5 projects")
        for _ in tqdm(range(5)):
            projects.append(ProjectFactory.make())

        DriveFactory.make(
            driver=drivers[0],
            project=projects[0],
            passenger=passengers[0],
            car=cars[0],
            start_mileage=1,
            end_mileage=100,
            description="Default verified drive",
            start_location="Start",
            end_location="End",
            is_verified=True,
        )
        DriveFactory.make(
            driver=drivers[0],
            project=projects[0],
            passenger=passengers[0],
            car=cars[0],
            start_mileage=1,
            end_mileage=100,
            description="Default unverified drive",
            start_location="Start",
            end_location="End",
            is_verified=False,
        )
        info("Creating 50 drives")
        for _ in tqdm(range(50)):
            DriveFactory.make(
                passenger=random.choice(passengers),
                project=random.choice(projects),
                driver=random.choice(drivers),
            )

        info("Database successfully populated")
        info("=" * 60)

        info(f"{'Newly created drivers (username : password)':>56}")
        for index, user in enumerate(drivers, start=1):
            info(f"{index:02d}. {user.username:>40} : {UserFactory.password}")

        info("=" * 60)

        info(f"{'Newly created passengers (username : password)':>56}")
        for index, user in enumerate(passengers, start=1):
            info(f"{index:02d}. {user.username:>40} : {UserFactory.password}")
