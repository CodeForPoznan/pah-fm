from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.timezone import now


class DriverUserProfile(AbstractUser):

    def __str__(self):
        return self.username


class CarModel(models.Model):
    plates = models.CharField(max_length=10, blank=False, unique=True)

    def __str__(self):
        return self.plates


class PassengerModel(models.Model):
    first_name = models.CharField(max_length=20, blank=False, unique=True)
    last_name = models.CharField(max_length=20, blank=False, unique=True)

    def __str__(self):
        return self.last_name


class RouteModel(models.Model):
    driver = models.ForeignKey(DriverUserProfile, on_delete=models.CASCADE)
    car = models.ForeignKey(CarModel, null=False, on_delete=models.CASCADE)
    passengers = models.ManyToManyField(PassengerModel)
    date = models.DateField(default=now, blank=False)
    start_mileage = models.IntegerField(null=False)
    end_mileage = models.IntegerField(null=False)
    fuel_level_begin = models.FloatField(null=False)
    fuel_level_end = models.FloatField(null=False)
