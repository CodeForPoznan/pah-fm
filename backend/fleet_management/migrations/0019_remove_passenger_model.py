# Generated by Django 2.1.2 on 2019-10-02 21:00

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("fleet_management", "0018_passenger_to_user"),
    ]

    operations = [
        migrations.RemoveField(model_name="drive", name="passengers",),
        migrations.DeleteModel(name="Passenger",),
    ]
