from django.db import models


class CarModel(models.Model):
    plates = models.CharField(max_length=10, unique=True, blank=False)

    def __str__(self):
        return self.plates
