# Generated by Django 2.1.15 on 2019-12-21 23:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("fleet_management", "0021_regenerate_keys"),
    ]

    operations = [
        migrations.AlterField(
            model_name="drive", name="date", field=models.DateField(auto_now_add=True),
        ),
    ]
