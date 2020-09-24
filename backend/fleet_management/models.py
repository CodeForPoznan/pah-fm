import calendar
import time

from django.contrib.auth.models import AbstractUser
from django.db import models
from django_countries.fields import CountryField

from djmoney.models.fields import MoneyField

from fleet_management.crypto import PublicKey, PrivateKey, find_pair_of_keys, hash_dict


def get_current_timestamp_in_gmt():
    return calendar.timegm(time.gmtime())


class User(AbstractUser):
    country = CountryField(blank_label="(select country)", null=False)
    rsa_modulus_n = models.CharField(max_length=6, null=False, default="")
    rsa_pub_e = models.CharField(max_length=6, null=False, default="")
    rsa_priv_d = models.CharField(max_length=6, null=False, default="")
    last_seen = models.DateTimeField(null=True, blank=True)

    def save(self, *args, **kwargs):
        if self.pk is None:
            self.regenerate_keys()

        super().save(*args, **kwargs)

    def regenerate_keys(self):
        pub, priv = find_pair_of_keys()
        self.rsa_modulus_n = str(pub.n).zfill(6)
        self.rsa_pub_e = str(pub.e).zfill(6)
        self.rsa_priv_d = str(priv.d).zfill(6)

    def public_key(self) -> PublicKey:
        return PublicKey(int(str(self.rsa_modulus_n)), int(str(self.rsa_pub_e)))

    def private_key(self) -> PrivateKey:
        return PrivateKey(int(str(self.rsa_modulus_n)), int(str(self.rsa_priv_d)))

    def __str__(self):
        return f"{self.first_name} {self.last_name}"


class Car(models.Model):
    plates = models.CharField(max_length=10, blank=False, unique=True)
    description = models.CharField(max_length=500, blank=True)
    fuel_consumption = models.FloatField(null=False, default=0)
    country = CountryField(blank_label="(select country)", null=False)

    def __str__(self):
        return self.plates


class Project(models.Model):
    title = models.CharField(max_length=50, blank=False)
    description = models.CharField(max_length=1000, blank=False)
    country = CountryField(blank_label="(select country)", default=None)

    def __str__(self):
        return self.title


class Drive(models.Model):
    driver = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="drives_driven"
    )
    car = models.ForeignKey(Car, null=False, on_delete=models.CASCADE)
    date = models.DateField(auto_now_add=True, blank=False)
    start_mileage = models.IntegerField(null=False)
    end_mileage = models.IntegerField(null=False)
    description = models.CharField(max_length=1000, blank=True)
    start_location = models.CharField(max_length=100, blank=False)
    end_location = models.CharField(max_length=100, blank=False)
    country = CountryField(blank_label="(use driver's country)", null=False, blank=True)
    timestamp = models.IntegerField(blank=False, default=get_current_timestamp_in_gmt)
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    is_verified = models.BooleanField(default=False)
    passenger = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="drives_taken",
        null=True,
        blank=True,
    )

    class Meta:
        unique_together = [
            (
                "end_mileage",
                "start_mileage",
                "timestamp",
                "start_location",
                "end_location",
            )
        ]

    def save(self, *args, **kwargs):
        if not self.country:
            self.country = self.driver.country

        super().save(*args, **kwargs)

    def __str__(self):
        return f"Drive from {self.start_location} to {self.end_location} (driver: {self.driver})"

    @property
    def fuel_consumption(self):
        distance = self.end_mileage - self.start_mileage
        fuel_consumption = (distance * float(self.car.fuel_consumption)) / 100
        return round(fuel_consumption, 2)

    @property
    def diff_mileage(self):
        return self.end_mileage - self.start_mileage

    @staticmethod
    def hash_form(initial_data: dict) -> int:
        required_fields = {
            "car": initial_data["car"],
            "project": initial_data["project"],
            "passengers": initial_data["passengers"],
            "startLocation": initial_data["start_location"],
            "endLocation": initial_data["end_location"],
            "startMileage": initial_data["start_mileage"],
            "endMileage": initial_data["end_mileage"],
        }
        return hash_dict(required_fields)


class Refuel(models.Model):
    driver = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="drives_refueled"
    )
    car = models.ForeignKey(Car, null=False, on_delete=models.CASCADE)
    date = models.DateField(auto_now_add=True, blank=False)
    current_mileage = models.PositiveIntegerField(null=False)
    refueled_liters = models.PositiveIntegerField(null=False)
    price_per_liter = models.PositiveIntegerField(null=False)
    currency = MoneyField(
        max_digits=10, decimal_places=2, null=False, default_currency="USD"
    )
