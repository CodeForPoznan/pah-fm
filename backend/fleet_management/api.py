from rest_framework import generics, filters, views
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from .models import Car, Drive, Passenger
from .serializers import (
    CarSerializer,
    DriveSerializer,
    PassengerSerializer,
    UserSerializer,
)


class CurrentUserRetrieveView(views.APIView):
    def get(self, request):
        return Response(
            UserSerializer(request.user).data
        )


class PassengerListView(generics.ListAPIView):
    serializer_class = PassengerSerializer
    queryset = Passenger.objects.all()
    filter_backends = (filters.OrderingFilter, filters.SearchFilter)
    search_fields = (
        'first_name',
        'last_name',
    )
    ordering = ('first_name', 'last_name')


class CarListView(generics.ListAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = CarSerializer
    queryset = Car.objects.all()
    search_fields = ('plates',)
    filter_backends = (filters.OrderingFilter, filters.SearchFilter)
    ordering = ('plates',)


class DriveView(generics.ListCreateAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = DriveSerializer
    filter_backends = (filters.OrderingFilter,)
    ordering = ('-date',)

    def get_serializer_context(self):
        return {'driver': self.request.user}

    def get_queryset(self):
        return Drive.objects.filter(
            driver__id=self.request.user.id,
        )
