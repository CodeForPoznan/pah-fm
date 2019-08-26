import random

from django.core.management.base import BaseCommand
from tqdm import tqdm

from django.contrib.auth.models import Group
from ...constants import Groups


from fleet_management.factories import (
    CarFactory,
    DriveFactory,
    PassengerFactory,
    ProjectFactory,
    UserFactory,
)
from ...models import Passenger, Project, User


class Command(BaseCommand):
    help = "Populates database with fake items."

    def handle(self, *args, **options):
        self.stdout.write(self.style.SUCCESS('Creating 5 cars'))
        for _ in tqdm(range(5)):
            CarFactory.create()

        self.stdout.write(self.style.SUCCESS('Creating 5 users'))
        for _ in tqdm(range(5)):
            UserFactory.create()

        self.stdout.write(self.style.SUCCESS('Creating 10 passengers'))

        for _ in tqdm(range(10)):
            PassengerFactory.create()

        self.stdout.write(self.style.SUCCESS('Creating 5 projects'))
        for _ in tqdm(range(5)):
            ProjectFactory.create()

        self.stdout.write(self.style.SUCCESS('Creating 50 drives'))
        all_users = list(User.objects.all())
        all_passengers = list(User.objects.filter(groups__name=Groups.Passenger.name))
        all_projects = list(Project.objects.all())

        for _ in tqdm(range(50)):
            DriveFactory.create(
                passengers=random.sample(all_passengers, random.randint(1, 4)),
                project=random.choice(all_projects),
                driver=random.choice(all_users),
            )

        self.stdout.write(
            self.style.SUCCESS('Database successfully populated')
        )

        self.stdout.write('=' * 50)

        default_user = User.objects.filter(email='hello@codeforpoznan.pl').first()

        driver_group = Group.objects.get(name=Groups.Driver.name)
        driver_group.user_set.add(default_user)
        passenger_group = Group.objects.get(name=Groups.Passenger.name)
        passenger_group.user_set.add(default_user)
