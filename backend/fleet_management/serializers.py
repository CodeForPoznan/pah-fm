from django.db import transaction
from rest_framework import fields, serializers

from .models import Car, Drive, Passenger, User, Project, VerificationToken
from .signals import drive_created


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

            for passenger in passengers:
                token = VerificationToken.objects.create(
                    drive=drive,
                    passenger=passenger,
                )
                drive_created.send(
                    self.__class__,
                    drive_id=drive.id,
                    driver_id=self.context['driver'].id,
                    passenger_id=passenger.id,
                    token_id=token.id,
                )
            return drive


class VerificationTokenSerializer(serializers.ModelSerializer):
    is_active = fields.BooleanField(read_only=True)

    comment = fields.CharField(
        max_length=VerificationToken.COMMENT_MAX_LENGTH,
        write_only=True,
    )
    is_ok = fields.NullBooleanField(write_only=True)

    class Meta:
        model = VerificationToken
        fields = ['comment', 'is_ok', 'is_active']

    def update(self, instance, validated_data):
        instance.comment = validated_data['comment']
        instance.is_ok = validated_data['is_ok']
        instance.is_confirmed = True
        instance.save()

        return instance


class ProjectSerializer(serializers.ModelSerializer):

    class Meta:
        model = Project
        fields = ('title', 'description')
