from django.core.exceptions import ObjectDoesNotExist
from django.http import Http404
from rest_framework import generics, filters, permissions, views
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from fleet_management.models import VerificationToken
from fleet_management.serializers import VerificationTokenSerializer
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


class VerificationTokenView(generics.RetrieveUpdateAPIView):
    permission_classes = (permissions.AllowAny,)
    lookup_field = 'token'
    serializer_class = VerificationTokenSerializer
    queryset = VerificationToken.objects.all()

    def update(self, request, *args, **kwargs):
        kwargs['partial'] = False
        return super().update(request, args, kwargs)

    def perform_update(self, serializer: VerificationTokenSerializer):
        """
        Updates token status.

        If token is expired or already confirmed, the update is skipped.
        """
        token = serializer.instance

        if not (token.is_expired or token.is_confirmed):
            serializer.save()
