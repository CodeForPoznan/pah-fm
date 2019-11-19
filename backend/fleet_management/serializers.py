from django.db import transaction
from rest_framework import fields, serializers, status
from django.contrib.auth.models import Group

from rest_framework.exceptions import ValidationError

from fleet_management.crypto import sign, verify
from fleet_management.models import Car, Drive, User, Project


class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ('name',)


class UserSerializer(serializers.ModelSerializer):
    groups = GroupSerializer(many=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'groups')


class PassengerSerializer(serializers.ModelSerializer):
    id = fields.IntegerField(required=True)

    first_name = fields.CharField(read_only=True)
    last_name = fields.CharField(read_only=True)

    class Meta:
        model = User
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


class ProjectSerializer(serializers.ModelSerializer):
    id = fields.IntegerField(required=True)
    title = fields.CharField(read_only=True)
    description = fields.CharField(read_only=True)

    class Meta:
        model = Project
        fields = ('title', 'description', 'id')


class PassengersField(serializers.Field):
    def to_representation(self, value):
        return [PassengerSerializer(value).data]

    def to_internal_value(self, data):
        return data[0]


class DriveSerializer(serializers.ModelSerializer):
    driver = UserSerializer(read_only=True)
    car = CarSerializer()
    passengers = PassengersField(source="passenger")
    project = ProjectSerializer()
    signature = serializers.IntegerField(write_only=True)

    class Meta:
        model = Drive
        fields = (
            'id',
            'driver', 'car', 'passengers', 'project',
            'date', 'start_mileage', 'end_mileage', 'description',
            'start_location', 'end_location', 'timestamp', 'signature'
        )
        read_only_fields = ('is_verified',)

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.hashed_form = 0

    def create(self, validated_data):
        passenger_data = validated_data.pop('passenger')
        car_data = validated_data.pop('car')
        car = Car.objects.get(pk=car_data['id'])
        project_data = validated_data.pop('project')
        project = Project.objects.get(pk=project_data['id'])
        passenger = User.objects.get(pk=passenger_data['id'])
        form_signature = validated_data.pop('signature')

        signature = sign(self.hashed_form, passenger.private_key())
        is_verified = verify(self.hashed_form, form_signature, passenger.public_key())
        is_verified = is_verified and signature == form_signature

        with transaction.atomic():
            drive = Drive.objects.create(
                **validated_data,
                is_verified=is_verified,
                driver=self.context['driver'],
                car=car,
                project=project,
                passenger=passenger
            )
            drive.save()

            return drive

    def is_valid(self, raise_exception=False):
        try:
            if super().is_valid(raise_exception=raise_exception):
                self.hashed_form = Drive.form_as_hash(self.initial_data)
                return True
        except ValidationError as err:
            err_codes = err.get_codes()
            if "non_field_errors" in err_codes and "unique" in err_codes["non_field_errors"]:
                err.status_code = status.HTTP_409_CONFLICT
            raise err
