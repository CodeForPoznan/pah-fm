# Generated by Django 2.1.2 on 2019-08-21 19:26

from django.db import migrations, models
import fleet_management.models


class Migration(migrations.Migration):

    dependencies = [
        ("fleet_management", "0013_merge_20190821_1839"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="verificationtoken",
            name="drive",
        ),
        migrations.RemoveField(
            model_name="verificationtoken",
            name="passenger",
        ),
        migrations.AlterField(
            model_name="drive",
            name="timestamp",
            field=models.IntegerField(default=1566415618),
        ),
        migrations.DeleteModel(
            name="VerificationToken",
        ),
        migrations.AlterField(
            model_name="drive",
            name="timestamp",
            field=models.IntegerField(
                default=fleet_management.models.get_current_timestamp_in_gmt
            ),
        ),
    ]
