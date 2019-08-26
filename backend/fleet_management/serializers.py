from django.db import transaction
from rest_framework import fields, serializers, status
from django.contrib.auth.models import Group

from rest_framework.exceptions import ValidationError

from .models import Car, Drive, User, Project


class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ('name',)


class UserSerializer(serializers.ModelSerializer):
    groups = GroupSerializer(many=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'groups')


class PassengerSerializer(UserSerializer):

    first_name = fields.CharField(read_only=True)
    last_name = fields.CharField(read_only=True)


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


class DriveSerializer(serializers.ModelSerializer):
    driver = UserSerializer(read_only=True)
    car = CarSerializer()
    passengers = PassengerSerializer(many=True)
    project = ProjectSerializer()

    class Meta:
        model = Drive
        fields = (
            'id',
            'driver', 'car', 'passengers', 'project',
            'date', 'start_mileage', 'end_mileage', 'description',
            'start_location', 'end_location', 'timestamp'
        )
        read_only_fields = ('is_verified',)

    def create(self, validated_data):
        passengers_data = validated_data.pop('passengers')
        car_data = validated_data.pop('car')
        car = Car.objects.get(pk=car_data['id'])
        project_data = validated_data.pop('project')
        project = Project.objects.get(pk=project_data['id'])
        passengers = Passenger.objects.filter(
            id__in=[p['id'] for p in passengers_data],
        ).all()

        with transaction.atomic():
            drive = Drive.objects.create(
                **validated_data,
                # TODO Awaiting validation
                is_verified=True,
                driver=self.context['driver'],
                car=car,
                project=project
            )
            drive.passengers.set(passengers)
            drive.save()

            return drive

    def is_valid(self, raise_exception=False):
        try:
            return super().is_valid(raise_exception=raise_exception)
        except ValidationError as err:
            err_codes = err.get_codes()
            if "non_field_errors" in err_codes and "unique" in err_codes["non_field_errors"]:
                err.status_code = status.HTTP_409_CONFLICT
            raise err
