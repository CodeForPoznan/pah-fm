from rest_framework import serializers
from .models import User, Car, Passenger, Project, Route


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username')


class PassengerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Passenger
        fields = (
            'first_name',
            'last_name',
        )


class CarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Car
        fields = (
            'plates',
        )


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = (
            'project_title',
            'project_description',
        )


class RouteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Route
        fields = (
            'car',
            'project',
            'passengers',
            'date',
            'start_mileage',
            'end_mileage',
            'description',
            'place_from',
            'place_destination',
        )
