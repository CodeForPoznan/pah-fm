from django.db import models
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

    def __str__(self):
        return f'{self.first_name} {self.last_name}'


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

    def __str__(self):
        return f'{self.driver.username} ({self.date})'


class Project(models.Model):
    drives = models.ManyToManyField(Drive)
    title = models.CharField(max_length=50, blank=False)
    description = models.CharField(max_length=1000, blank=False)

    def __str__(self):
        return self.title
