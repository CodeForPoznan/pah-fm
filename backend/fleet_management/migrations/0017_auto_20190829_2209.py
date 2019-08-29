from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('fleet_management', '0016_auto_20190829_2155'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='drive',
            name='passengers',
        ),
        migrations.DeleteModel(
            name='Passenger',
        ),
    ]
