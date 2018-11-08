from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import generics, filters, views
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from .models import Car, Passenger
from .serializers import (
    CarSerializer,
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
    filter_backends = (filters.OrderingFilter,)
    search_fields = (
        'first_name',
        'last_name',
    )


class CarListView(generics.ListAPIView):
    authentication_classes = (IsAuthenticated,)
    serializer_class = CarSerializer
    queryset = Car.objects.all()
    filter_backends = (filters.OrderingFilter, filters.SearchFilter, DjangoFilterBackend,)
    search_fields = (
        'plates',
    )
