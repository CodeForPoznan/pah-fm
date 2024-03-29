from datetime import timedelta

from django.utils import timezone
from rest_framework import filters, generics, views
from rest_framework.response import Response

from .constants import Groups
from .models import Car, Drive, Project, Refuel, User
from .permissions import GroupPermission, all_driver_methods
from .serializers import (
    CarSerializer,
    DriveSerializer,
    PassengerSerializer,
    ProjectSerializer,
    RefuelSerializer,
    UserSerializer,
)


class CurrentUserRetrieveView(views.APIView):
    def get(self, request):
        return Response(UserSerializer(request.user).data)


class PassengerListView(generics.ListAPIView):
    permission_classes = [GroupPermission]
    required_groups = all_driver_methods
    serializer_class = PassengerSerializer
    filter_backends = (filters.OrderingFilter, filters.SearchFilter)
    search_fields = ("first_name", "last_name")
    ordering = ("first_name", "last_name")

    def get_queryset(self):
        return User.objects.filter(
            groups__name=Groups.Passenger.name, country=self.request.user.country
        ) | User.objects.filter(country=None, groups__name=Groups.Passenger.name)


class CarListView(generics.ListAPIView):
    permission_classes = [GroupPermission]
    required_groups = all_driver_methods
    serializer_class = CarSerializer
    search_fields = ("plates",)
    filter_backends = (filters.OrderingFilter, filters.SearchFilter)
    ordering = ("plates",)

    def get_queryset(self):
        return Car.objects.filter(country=self.request.user.country)


class DriveView(generics.ListCreateAPIView):
    permission_classes = [GroupPermission]
    required_groups = all_driver_methods
    serializer_class = DriveSerializer
    filter_backends = (filters.OrderingFilter,)
    ordering = ("-date",)

    def get_serializer_context(self):
        return {"driver": self.request.user}

    def get_queryset(self):
        return Drive.objects.filter(
            driver=self.request.user, date__gte=timezone.now() - timedelta(days=30)
        )


class ProjectView(generics.ListAPIView):
    permission_classes = [GroupPermission]
    required_groups = all_driver_methods

    serializer_class = ProjectSerializer

    def get_queryset(self):
        return Project.objects.filter(country=self.request.user.country)


class RefuelView(generics.ListCreateAPIView):
    permission_classes = [GroupPermission]
    required_groups = all_driver_methods

    serializer_class = RefuelSerializer

    def get_queryset(self):
        return Refuel.objects.all()
