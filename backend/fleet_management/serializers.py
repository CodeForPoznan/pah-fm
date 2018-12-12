from django.db import transaction
from rest_framework import fields, serializers

from .models import Car, Drive, Passenger, User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username')


class PassengerSerializer(serializers.ModelSerializer):
    id = fields.IntegerField(required=True)

    first_name = fields.CharField(read_only=True)
    last_name = fields.CharField(read_only=True)

    class Meta:
        model = Passenger
        fields = ('id', 'first_name', 'last_name')


class CarSerializer(serializers.ModelSerializer):
    id = fields.IntegerField(required=True)
    plates = fields.CharField(read_only=True)

    class Meta:
        model = Car
        fields = (
            'id',
            'plates',
            'fuel_consumption',
            'description',
        )


class DriveSerializer(serializers.ModelSerializer):
    driver = UserSerializer(read_only=True)
    car = CarSerializer()
    passengers = PassengerSerializer(many=True)

    class Meta:
        model = Drive
        fields = (
            'id',
            'driver', 'car', 'passengers',
            'date', 'start_mileage', 'end_mileage', 'description',
            'start_location', 'end_location',
        )

    def create(self, validated_data):
        passengers_data = validated_data.pop('passengers')
        car_data = validated_data.pop('car')
        car = Car.objects.get(pk=car_data['id'])
        passengers = Passenger.objects.filter(
            id__in=[p['id'] for p in passengers_data],
        ).all()

        with transaction.atomic():
            drive = Drive.objects.create(
                **validated_data,
                driver=self.context['driver'],
                car=car,
            )
            drive.passengers.set(passengers)
            drive.save()
            return drive
