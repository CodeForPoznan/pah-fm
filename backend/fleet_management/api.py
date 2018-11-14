from rest_framework import generics, filters, views
from rest_framework.response import Response
from .serializers import PassengerSerializer, UserSerializer
from .models import Passenger


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
