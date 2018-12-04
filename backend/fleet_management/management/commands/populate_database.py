import random

from django.core.management.base import BaseCommand
from tqdm import tqdm

from fleet_management.factories import (
    CarFactory,
    DriveFactory,
    PassengerFactory,
    ProjectFactory,
    UserFactory,
)
from fleet_management.models import Passenger, Project, User


class Command(BaseCommand):
    """Populate database with fake items."""

    help = "Populates database with fake items."

    def handle(self, *args, **options):
        """Populate database with fake objects."""

        self.stdout.write(self.style.SUCCESS('Creating 30 cars'))
        for _ in tqdm(range(30)):
            CarFactory.create()

        self.stdout.write(self.style.SUCCESS('Creating 50 users'))
        usernames = []
        for _ in tqdm(range(50)):
            usernames.append(UserFactory.create().username)

        self.stdout.write(self.style.SUCCESS('Creating 150 passengers'))
        for _ in tqdm(range(150)):
            PassengerFactory.create()

        self.stdout.write(self.style.SUCCESS('Creating 30 projects'))
        for _ in tqdm(range(30)):
            ProjectFactory.create()

        self.stdout.write(self.style.SUCCESS('Creating 500 drives'))
        all_users = list(User.objects.all())
        all_passengers = list(Passenger.objects.all())
        all_projects = list(Project.objects.all())
        for _ in tqdm(range(500)):
            DriveFactory.create(
                passengers=random.sample(all_passengers, random.randint(1, 4)),
                project_set=random.sample(all_projects, random.randint(1, 4)),
                driver=random.choice(all_users),
            )

        self.stdout.write(
            self.style.SUCCESS('Database successfully populated')
        )

        self.stdout.write('=' * 50)
        self.stdout.write(self.style.SUCCESS('Newly created users:'))
        for index, username in enumerate(usernames):
            self.stdout.write(self.style.SUCCESS('{index}. {username}'.format(
                index=index,
                username=username,
            )))
