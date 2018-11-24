from rest_framework import serializers

from .models import Car, Passenger, Project, User


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


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = (
            'id',
            'title',
            'description',
        )
