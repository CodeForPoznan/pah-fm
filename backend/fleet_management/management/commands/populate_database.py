import random

from django.core.management.base import BaseCommand
from tqdm import tqdm

from ...factories import (
    CarFactory,
    DriveFactory,
    PassengerFactory,
    ProjectFactory,
    UserFactory,
)
from ...models import Passenger, Project, User


class Command(BaseCommand):
    """Populate database with fake items."""

    help = "Populates database with fake items."

    def handle(self, *args, **options):
        superuser = User()
        superuser.is_active = True
        superuser.is_superuser = True
        superuser.is_staff = True
        superuser.username = 'hello@codeforpoznan.pl'
        superuser.email = 'hello@codeforpoznan.pl'
        superuser.set_password('cfp123')
        superuser.country = 'UA'
        superuser.save()

        superuser = User()
        superuser.is_active = True
        superuser.is_superuser = False
        superuser.is_staff = False
        superuser.username = 'ola@pah.org.pl'
        superuser.email = 'ola@pah.org.pl'
        superuser.set_password('pah123')
        superuser.country = 'UA'
        superuser.save()

        self.stdout.write(self.style.SUCCESS('Creating 5 cars'))
        for _ in tqdm(range(5)):
            CarFactory.create()

        self.stdout.write(self.style.SUCCESS('Creating 5 users'))
        usernames = []
        for _ in tqdm(range(5)):
            usernames.append(UserFactory.create().username)

        self.stdout.write(self.style.SUCCESS('Creating 10 passengers'))
        for _ in tqdm(range(10)):
            PassengerFactory.create()

        self.stdout.write(self.style.SUCCESS('Creating 5 projects'))
        for _ in tqdm(range(5)):
            ProjectFactory.create()

        self.stdout.write(self.style.SUCCESS('Creating 50 drives'))
        all_users = list(User.objects.all())
        all_passengers = list(Passenger.objects.all())
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
        self.stdout.write(self.style.SUCCESS('Newly created users:'))
        for index, username in enumerate(usernames):
            self.stdout.write(self.style.SUCCESS('{index}. {username}'.format(
                index=index,
                username=username,
            )))
