from django.db import migrations
from django.contrib.auth.models import Group
from faker import Faker

from fleet_management.constants import Groups
from ..models import User, Drive


class Passenger():
    pass


def create_users_from_passengers(apps, schema_editor):
    passenger_group = Group.objects.get(name=Groups.Passenger.name)

    passengers = Passenger.objects.all()

    for index, passenger in enumerate(passengers):
        fake = Faker()
        password = fake.password()

        email = passenger.email or f"no-email{index}@pah.org.pl"

        user = User.objects.create_user(
            username=email,
            email=email,
            password=password,
            is_superuser=False,
            is_staff=False,
            country=passenger.country,
            is_active=True,
            first_name=passenger.first_name,
            last_name=passenger.last_name
        )

        user.save()

        passenger_group.user_set.add(user)

        drives = Drive.objects.filter(passengers=passenger.id)

        for drive in drives:
            drive.passenger = user
            drive.save()

        print(f"\n{email}: {password}")


class Migration(migrations.Migration):

    dependencies = [
        ('fleet_management', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(create_users_from_passengers),
    ]

