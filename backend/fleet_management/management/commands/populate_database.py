import random

from django.core.management.base import BaseCommand
from tqdm import tqdm

from django.contrib.auth.models import Group
from ...constants import Groups


from fleet_management.factories import (
    CarFactory,
    DriveFactory,
    ProjectFactory,
    UserFactory,
)
from ...models import Project, User


class Command(BaseCommand):
    """Populate database with fake items."""

    help = "Populates database with fake items."

    def handle(self, *args, **options):
        driver_group = Group.objects.get(name=Groups.Driver.name)
        passenger_group = Group.objects.get(name=Groups.Passenger.name)

        self.stdout.write(self.style.SUCCESS("Creating 5 cars"))
        for _ in tqdm(range(5)):
            CarFactory.create()

        self.stdout.write(self.style.SUCCESS("Creating 5 drivers"))
        drivers = []
        for _ in tqdm(range(5)):
            drivers.append(UserFactory.create(groups=[driver_group]).username)

        passengers = []
        self.stdout.write(self.style.SUCCESS("Creating 10 passengers"))
        for _ in tqdm(range(10)):
            passengers.append(UserFactory.create(groups=[passenger_group]).username)

        self.stdout.write(self.style.SUCCESS("Creating 5 projects"))
        for _ in tqdm(range(5)):
            ProjectFactory.create()

        self.stdout.write(self.style.SUCCESS("Creating 50 drives"))
        all_drivers = list(User.objects.filter(groups=driver_group))
        all_passengers = list(User.objects.filter(groups=passenger_group))
        all_projects = list(Project.objects.all())

        for _ in tqdm(range(50)):
            DriveFactory.create(
                passenger=random.choice(all_passengers),
                project=random.choice(all_projects),
                driver=random.choice(all_drivers),
            )

        self.stdout.write(self.style.SUCCESS("Database successfully populated"))

        self.stdout.write("=" * 50)
        self.stdout.write(self.style.SUCCESS("Newly created drivers:"))
        for index, username in enumerate(drivers):
            self.stdout.write(
                self.style.SUCCESS(
                    "{index}. {username}".format(index=index, username=username,)
                )
            )

        self.stdout.write(self.style.SUCCESS("Newly created passengers:"))
        for index, username in enumerate(passengers):
            self.stdout.write(
                self.style.SUCCESS(
                    "{index}. {username}".format(index=index, username=username,)
                )
            )

        default_user = User.objects.filter(email="hello@codeforpoznan.pl").first()

        driver_group.user_set.add(default_user)
        passenger_group.user_set.add(default_user)
