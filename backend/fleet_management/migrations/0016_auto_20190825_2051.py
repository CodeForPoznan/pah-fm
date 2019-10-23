from django.db import migrations


def default_country_to_project(apps, schema_editor):
    Project = apps.get_model("fleet_management", "Project")
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
