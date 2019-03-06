import pytz
import uuid
from datetime import datetime, timedelta

from django.db import models
from django.conf import settings
from django.contrib.auth.models import AbstractUser
from django.utils.timezone import now


class User(AbstractUser):

    def __str__(self):
        return self.username


class Car(models.Model):
    KILOMETERS = 'kilometers'
    MILES = 'miles'
    UNITS = (
        (KILOMETERS, KILOMETERS),
        (MILES, MILES),
    )
    plates = models.CharField(max_length=10, blank=False, unique=True)
    description = models.CharField(max_length=500, blank=True)
    mileage_unit = models.CharField(
        choices=UNITS, max_length=11, default='kilometers',
    )
    fuel_consumption = models.FloatField(null=False, default=0)

    def __str__(self):
        return self.plates


class Passenger(models.Model):
    first_name = models.CharField(max_length=60, blank=False)
    last_name = models.CharField(max_length=60, blank=False)
    email = models.EmailField(blank=False)

    def __str__(self):
        return f'{self.first_name} {self.last_name}'


class Project(models.Model):
    title = models.CharField(max_length=50, blank=False)
    description = models.CharField(max_length=1000, blank=False)

    def __str__(self):
        return self.title


class Drive(models.Model):
    driver = models.ForeignKey(User, on_delete=models.CASCADE)
    car = models.ForeignKey(Car, null=False, on_delete=models.CASCADE)
    passengers = models.ManyToManyField(Passenger)
    date = models.DateField(default=now, blank=False)
    start_mileage = models.IntegerField(null=False)
    end_mileage = models.IntegerField(null=False)
    description = models.CharField(max_length=1000, blank=True)
    start_location = models.CharField(max_length=100, blank=False)
    end_location = models.CharField(max_length=100, blank=False)
    project = models.ForeignKey(Project, on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.driver.username} ({self.date})'


class VerificationToken(models.Model):
    """
    Keeps track of drives' verification statuses.
    """
    EXPIRATION_DELTA = timedelta(days=7)
    COMMENT_MAX_LENGTH = 2000

    comment = models.CharField(max_length=COMMENT_MAX_LENGTH, blank=True)
    is_confirmed = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    drive = models.ForeignKey(Drive, on_delete=models.CASCADE)
    is_ok = models.NullBooleanField()
    passenger = models.ForeignKey(Passenger, on_delete=models.CASCADE)
    token = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)

    @property
    def is_expired(self):
        utc_now = pytz.utc.localize(datetime.utcnow())
        return utc_now > self.created_at + self.EXPIRATION_DELTA

    @property
    def is_active(self):
        return not self.is_confirmed and not self.is_expired

    @property
    def verification_url(self):
        return f'{settings.FRONTEND_URL}/confirmation/{self.token}'

    def __str__(self):
        return str(self.token)
