# Generated by Django 2.2.13 on 2020-07-18 14:49

import django_countries.fields
from django.db import migrations


def migrate_drive__driver__country_to_drive__country(apps, schema_editor):
    Drive = apps.get_model("fleet_management", "Drive")

    for drive in Drive.objects.all():
        drive.country = drive.driver.country
        drive.save()


class Migration(migrations.Migration):

    dependencies = [
        ("fleet_management", "0023_user_last_seen"),
    ]

    operations = [
        migrations.AddField(
            model_name="drive",
            name="country",
            field=django_countries.fields.CountryField(default="", max_length=2),
            preserve_default=False,
        ),
        migrations.RunPython(migrate_drive__driver__country_to_drive__country),
    ]
