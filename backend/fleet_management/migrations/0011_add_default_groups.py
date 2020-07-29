from django.db import migrations


def create_groups(apps, schema_editor):
    Group = apps.get_model("auth", "Group")

    Group.objects.create(name="Passenger")
    Group.objects.create(name="Driver")


def insert_to_groups(apps, schema_editor):
    User = apps.get_model("fleet_management", "User")
    Group = apps.get_model("auth", "Group")
    g = Group.objects.get(name="Driver")
    users = User.objects.all()
    for u in users:
        g.user_set.add(u)


class Migration(migrations.Migration):

    dependencies = [
        ("fleet_management", "0010_auto_20190731_1747"),
    ]

    operations = [
        migrations.RunPython(create_groups),
        migrations.RunPython(insert_to_groups),
    ]
