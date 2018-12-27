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


class VerificationTokenSubmissionView(generics.GenericAPIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, *args, **kwargs):
        """
        Updates token status.

        If token is expired or already confirmed, the update is skipped.
        """
        VerificationTokenSerializer(data=request.data).is_valid(raise_exception=True)

        try:
            token = VerificationToken.objects.get(token=self.kwargs['token'])  # type: VerificationToken
        except ObjectDoesNotExist:
            raise Http404

        if token.is_expired or token.is_confirmed:
            return Response(
                VerificationTokenSerializer(token).data
            )

        token.comment = request.data['comment']
        token.is_ok = request.data['is_ok']
        token.save()

        return Response(
            VerificationTokenSerializer(token).data
        )

