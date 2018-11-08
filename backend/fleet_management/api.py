from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import generics, filters, views
from rest_framework.response import Response
from .serializers import UserSerializer, RouteSerializer
from .models import Route
from rest_framework.permissions import IsAuthenticated


class CurrentUserRetrieveView(views.APIView):
    def get(self, request):
        return Response(
            UserSerializer(request.user).data
        )


class RouteListView(generics.ListAPIView):
    authentication_classes = (IsAuthenticated,)
    serializer_class = RouteSerializer
    filter_backends = (filters.OrderingFilter, filters.SearchFilter, DjangoFilterBackend,)
    search_fields = (
        'car',
        'project',
        'passengers',
        'date',
        'start_mileage',
        'end_mileage',
        'description',
        'place_from',
        'place_destination',
    )

    def get_queryset(self):
        return Route.objects.filter(driver=self.request.user)
