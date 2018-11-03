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
    fuel_level_begin = models.FloatField(null=False)
    fuel_level_end = models.FloatField(null=False)

    def fuel_consumption(self):
        fuel_delta = self.fuel_level_end - self.fuel_level_begin
        mileage_delta = self.end_mileage - self.start_mileage
        return 100*(fuel_delta/mileage_delta)
