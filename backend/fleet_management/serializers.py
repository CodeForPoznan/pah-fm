from rest_framework import serializers

from .models import Car, Passenger, User, Route


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username')


class PassengerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Passenger
        fields = (
            'id',
            'first_name',
            'last_name',
        )


class CarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Car
        fields = (
            'id',
            'plates',
            'fuel_consumption',
            'description',
        )

class RouteListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Route
        fields = (
            'id',
            'date',
            'start_mileage',
            'end_mileage',
            'fuel_level_begin',
            'fuel_level_end',
            'car',
            'driver',
            'passengers'
        )
