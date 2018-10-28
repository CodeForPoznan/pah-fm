from django.contrib import admin
from .models import Car, Driver, Passenger, Route


admin.site.register(Car)
admin.site.register(Driver)
admin.site.register(Passenger)
admin.site.register(Route)
