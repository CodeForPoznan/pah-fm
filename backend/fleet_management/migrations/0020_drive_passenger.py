from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('fleet_management', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='drive',
            name='passenger',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='drive_passengers', to=settings.AUTH_USER_MODEL),
        ),
    ]
