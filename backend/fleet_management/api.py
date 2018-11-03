from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import generics, filters
from .serializer import CarSerializer, PassengerSerializer
from .models import Car, Passenger


class CarListView(generics.ListAPIView):
    serializer_class = CarSerializer
    queryset = Car.objects.all()
    filter_backends = (filters.OrderingFilter, filters.SearchFilter, DjangoFilterBackend,)
    search_fields = (
        'plates',
    )


class PassengerListView(generics.ListAPIView):
    serializer_class = PassengerSerializer
    queryset = Passenger.objects.all()
    filter_backends = (filters.OrderingFilter, filters.SearchFilter, DjangoFilterBackend,)
    search_fields = (
        'first_name',
        'last_name',
    )
