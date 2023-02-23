from django.conf import settings
from django.contrib.auth.models import Group
from django.core.exceptions import ObjectDoesNotExist
from django.db import transaction
from djmoney.money import Money
from rest_framework import fields, serializers, status
from rest_framework.exceptions import ValidationError

from fleet_management.crypto import sign, verify
from fleet_management.models import Car, Drive, Project, Refuel, User


class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ("name",)


class UserSerializer(serializers.ModelSerializer):
    groups = GroupSerializer(many=True)
    rsa_modulus_n = fields.CharField(read_only=True)
    rsa_pub_e = fields.CharField(read_only=True)
    rsa_priv_d = fields.CharField(read_only=True)

    class Meta:
        model = User
        fields = (
            "id",
            "username",
            "groups",
            "rsa_modulus_n",
            "rsa_pub_e",
            "rsa_priv_d",
        )


class PassengerSerializer(serializers.ModelSerializer):
    id = fields.IntegerField(required=True)

    first_name = fields.CharField(read_only=True)
    last_name = fields.CharField(read_only=True)
    rsa_modulus_n = fields.CharField(read_only=True)
    rsa_pub_e = fields.CharField(read_only=True)

    class Meta:
        model = User
        fields = ("id", "first_name", "last_name", "rsa_modulus_n", "rsa_pub_e")


class CarSerializer(serializers.ModelSerializer):
    id = fields.IntegerField(required=True)
    plates = fields.CharField(read_only=True)

    class Meta:
        model = Car
        fields = ("id", "plates", "fuel_consumption", "description")


class ProjectSerializer(serializers.ModelSerializer):
    id = fields.IntegerField(required=True)
    title = fields.CharField(read_only=True)
    description = fields.CharField(read_only=True)

    class Meta:
        model = Project
        fields = ("title", "description", "id")


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
    signature = serializers.IntegerField(write_only=True, required=False)

    class Meta:
        model = Drive
        fields = (
            "id",
            "driver",
            "car",
            "passengers",
            "project",
            "date",
            "start_mileage",
            "end_mileage",
            "description",
            "start_location",
            "end_location",
            "timestamp",
            "signature",
            "is_verified",
        )
        read_only_fields = ("is_verified",)

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.hashed_form = 0

    def create(self, validated_data):
        passenger_id = validated_data.pop("passenger")["id"]
        project_id = validated_data.pop("project")["id"]
        car_id = validated_data.pop("car")["id"]

        try:
            passenger = User.objects.get(id=passenger_id)
            project = Project.objects.get(id=project_id)
            car = Car.objects.get(id=car_id)
        except ObjectDoesNotExist as e:
            raise ValidationError(e.args[0])

        is_verified = False
        form_signature = validated_data.pop("signature", False)

        if form_signature:
            signature = sign(self.hashed_form, passenger.private_key())
            is_verified = verify(
                self.hashed_form, form_signature, passenger.public_key()
            )
            is_verified = is_verified and signature == form_signature

        with transaction.atomic():
            drive = Drive.objects.create(
                **validated_data,
                is_verified=is_verified,
                driver=self.context["driver"],
                car=car,
                project=project,
                passenger=passenger
            )
            drive.save()

            return drive

    def validate_signature(self, value):
        """validate the actual number in case someone sends 2^32 of 9's"""
        num_digits = len(str(2**settings.RSA_BIT_LENGTH))
        max_number = 10**num_digits - 1

        if value > max_number:
            raise ValidationError("Signature field contains incorrect value")

        return value

    def is_valid(self, raise_exception=False):
        try:
            if super().is_valid(raise_exception=raise_exception):
                self.hashed_form = Drive.hash_form(self.initial_data)
                return True
            return False
        except ValidationError as err:
            err_codes = err.get_codes()
            if (
                "non_field_errors" in err_codes
                and "unique" in err_codes["non_field_errors"]
            ):
                err.status_code = status.HTTP_409_CONFLICT
            raise err


class RefuelSerializer(serializers.ModelSerializer):
    driver = UserSerializer(read_only=True)
    car = CarSerializer()

    class Meta:
        model = Refuel
        fields = (
            "id",
            "driver",
            "car",
            "date",
            "current_mileage",
            "refueled_liters",
            "price_per_liter",
            "total_cost",
        )

    def create(self, validated_data):
        car_id = validated_data.pop("car")["id"]
        data = self.context["request"].data
        try:
            driver = User.objects.get(id=data["driver"]["id"])
            car = Car.objects.get(id=car_id)
        except ObjectDoesNotExist as e:
            raise ValidationError(e.args[0])

        with transaction.atomic():
            refuel = Refuel.objects.create(driver=driver, car=car, **validated_data)

        return refuel
