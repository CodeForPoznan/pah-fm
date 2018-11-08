from rest_framework import serializers

from .models import User, Car


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username')


class CarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Car
        fields = (
            'plates',
            'fuel_consumption',
        )
