import calendar
import time

from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.timezone import now
from django_countries.fields import CountryField


class User(AbstractUser):
    country = CountryField(blank_label='(select country)', null=False)

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
        choices=UNITS, max_length=11, default=KILOMETERS,
    )
    fuel_consumption = models.FloatField(null=False, default=0)
    country = CountryField(blank_label='(select country)', null=False)

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
    timestamp = models.IntegerField(blank=False, default=calendar.timegm(time.gmtime()))
    project = models.ForeignKey(Project, on_delete=models.CASCADE)

    class Meta:
        unique_together = [
            ('end_mileage', 'start_mileage', 'timestamp', 'start_location', 'end_location')
        ]

    def __str__(self):
        return f"""Drive from {self.start_location} to
                 {self.end_location} (driver: {self.driver.first_name} {self.driver.last_name})"""

    @property
    def fuel_consumption(self):
        distance = self.end_mileage - self.start_mileage
        fuel_consumption = (distance * float(self.car.fuel_consumption)) / 100
        return round(fuel_consumption, 2)
