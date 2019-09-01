from django.db import migrations
from ..models import Project


def default_country_to_project(apps, schema_editor):
    projects = Project.objects.all()
    for project in projects:
        project.country = 'UA'
        project.save()


class Migration(migrations.Migration):

    dependencies = [
        ('fleet_management', '0015_project_country'),
    ]

    operations = [
        migrations.RunPython(default_country_to_project),
    ]
