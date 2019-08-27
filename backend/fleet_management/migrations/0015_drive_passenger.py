from django.conf import settings
from django.db import migrations, models
from django.contrib.auth.models import Group
import django.db.models.deletion
from faker import Faker

from fleet_management.constants import Groups
from ..models import User, Passenger, Drive


def create_users_from_passengers():
    passenger_group = Group.objects.get(name=Groups.Passenger.name)

    passengers = Passenger.objects.all()

    for index, passenger in enumerate(passengers):
        fake = Faker()
        password = fake.password()

        email = passenger.email or f"no-email@pah{index}"

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

        passenger_group.user_set.add(user)

        # todo add user to drive
        # drive = Drive.filter()

        print(f"{email}: {password}")


class Migration(migrations.Migration):

    dependencies = [
        ('fleet_management', '0014_auto_20190821_1926'),
    ]

    operations = [
        migrations.AddField(
            model_name='drive',
            name='passenger',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='drive_passengers', to=settings.AUTH_USER_MODEL),
        ),
        migrations.RunPython(create_users_from_passengers),
    ]
