from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('fleet_management', '0014_auto_20190821_1926'),
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
