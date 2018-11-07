from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import generics, filters, views
from rest_framework.response import Response
from .models import Passenger
from .serializers import UserSerializer, PassengerSerializer


class CurrentUserRetrieveView(views.APIView):
    def get(self, request):
        return Response(
            UserSerializer(request.user).data
        )


class PassengerListView(generics.ListAPIView):
    serializer_class = PassengerSerializer
    queryset = Passenger.objects.all()
    filter_backends = (filters.OrderingFilter, filters.SearchFilter, DjangoFilterBackend,)
    search_fields = (
        'first_name',
        'last_name',
)
