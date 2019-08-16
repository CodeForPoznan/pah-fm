from rest_framework import generics, filters, views
from rest_framework.response import Response

from .permissions import GroupPermission, all_driver_methods
from .models import Car, Drive, Passenger, Project
from .serializers import (
    CarSerializer,
    DriveSerializer,
    PassengerSerializer,
    UserSerializer,
    ProjectSerializer,
)


class CurrentUserRetrieveView(views.APIView):

    def get(self, request):
        return Response(
            UserSerializer(request.user).data
        )


class PassengerListView(generics.ListAPIView):
    permission_classes = [GroupPermission]
    required_groups = all_driver_methods
    serializer_class = PassengerSerializer
    queryset = Passenger.objects.all()
    filter_backends = (filters.OrderingFilter, filters.SearchFilter)
    search_fields = (
        'first_name',
        'last_name',
    )
    ordering = ('first_name', 'last_name')


class CarListView(generics.ListAPIView):
    permission_classes = [GroupPermission]
    required_groups = all_driver_methods
    serializer_class = CarSerializer
    search_fields = ('plates',)
    filter_backends = (filters.OrderingFilter, filters.SearchFilter)
    ordering = ('plates',)

    def get_queryset(self):
        return Car.objects.filter(
            country=self.request.user.country,
        )


class DriveView(generics.ListCreateAPIView):
    permission_classes = [GroupPermission]
    required_groups = all_driver_methods
    serializer_class = DriveSerializer
    filter_backends = (filters.OrderingFilter,)
    ordering = ('-date',)

    def get_serializer_context(self):
        return {'driver': self.request.user}

    def get_queryset(self):
        return Drive.objects.filter(
            driver__id=self.request.user.id,
        )


class ProjectView(generics.ListAPIView):
    permission_classes = [GroupPermission]
    required_groups = all_driver_methods

    serializer_class = ProjectSerializer
    queryset = Project.objects.all()
