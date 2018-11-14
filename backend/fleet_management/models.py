from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.timezone import now


class User(AbstractUser):

    def __str__(self):
        return self.username


class Car(models.Model):
    plates = models.CharField(max_length=10, blank=False, unique=True)

    def __str__(self):
        return self.plates


class Passenger(models.Model):
    first_name = models.CharField(max_length=60, blank=False)
    last_name = models.CharField(max_length=60, blank=False)

    def __str__(self):
        return self.last_name


class Route(models.Model):
    driver = models.ForeignKey(User, on_delete=models.CASCADE)
    car = models.ForeignKey(Car, null=False, on_delete=models.CASCADE)
    passengers = models.ManyToManyField(Passenger)
    date = models.DateField(default=now, blank=False)
    start_mileage = models.IntegerField(null=False)
    end_mileage = models.IntegerField(null=False)
    description = models.CharField(max_length=500, blank=True)
    place_from = models.CharField(max_length=50, default='')
    place_destination = models.CharField(max_length=50, default='')
