
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('fleet_management', '0018_auto_20190902_2105'),
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
