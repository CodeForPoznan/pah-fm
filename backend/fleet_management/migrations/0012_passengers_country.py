# Generated by Django 2.1.2 on 2019-08-19 22:53

import django_countries.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("fleet_management", "0011_add_default_groups"),
    ]

    operations = [
        migrations.AddField(
            model_name="passenger",
            name="country",
            field=django_countries.fields.CountryField(
                default=None, max_length=2, null=True
            ),
        ),
    ]
