from rest_framework import serializers

from .models import User, Route


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username')


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

