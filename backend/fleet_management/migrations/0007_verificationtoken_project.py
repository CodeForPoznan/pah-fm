# Generated by Django 2.1.2 on 2019-01-13 16:35

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('fleet_management', '0006_verificationtoken'),
    ]

    operations = [
        migrations.AddField(
            model_name='verificationtoken',
            name='project',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='fleet_management.Project'),
        ),
    ]
