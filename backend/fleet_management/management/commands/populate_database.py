import random

from django.contrib.auth.models import Group
from django.core.management.base import BaseCommand
from django.db import transaction
from tqdm import tqdm

from fleet_management.constants import Groups
from fleet_management.factories import (
    CarFactory,
    DriveFactory,
    ProjectFactory,
    RefuelFactory,
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
            CarFactory.create(
                plates="UA000000",
                description="Default Car",
                fuel_consumption=10.0,
                country="UA",
            ),
        ]
        info("Creating 5 random cars")
        for _ in tqdm(range(5)):
            cars.append(CarFactory.create())

        drivers = [
            UserFactory.create(
                username="driver@codeforpoznan.pl",
                first_name="Default",
                last_name="Driver",
                country="UA",
                groups=[driver_group],
            ),
        ]
        info("Creating 5 random drivers")
        for _ in tqdm(range(5)):
            drivers.append(UserFactory.create(groups=[driver_group]))

        passengers = [
            UserFactory.create(
                username="passenger@codeforpoznan.pl",
                first_name="Default",
                last_name="Passenger",
                country="UA",
                groups=[passenger_group],
            ),
        ]
        info("Creating 5 random passengers")
        for _ in tqdm(range(5)):
            passengers.append(UserFactory.create(groups=[passenger_group]))

        projects = [
            ProjectFactory.create(
                title="Default Project", description="Default Project", country="UA",
            )
        ]
        info("Creating 5 random projects")
        for _ in tqdm(range(5)):
            projects.append(ProjectFactory.create())

        DriveFactory.create(
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
        DriveFactory.create(
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
        info("Creating 50 random drives")
        for _ in tqdm(range(50)):
            DriveFactory.create(
                passenger=random.choice(passengers),
                project=random.choice(projects),
                driver=random.choice(drivers),
                car=random.choice(cars),
            )
        info("Creating 50 random refuels")
        for _ in tqdm(range(50)):
            RefuelFactory.create(driver=random.choice(drivers), car=random.choice(cars))

        info("Database successfully populated with random data")
        info("=" * 60)

        info(f"{'Newly created drivers (username : password)':>56}")
        for index, user in enumerate(drivers, start=1):
            info(f"{index:02d}. {user.username:>40} : {UserFactory.password}")

        info("=" * 60)

        info(f"{'Newly created passengers (username : password)':>56}")
        for index, user in enumerate(passengers, start=1):
            info(f"{index:02d}. {user.username:>40} : {UserFactory.password}")
