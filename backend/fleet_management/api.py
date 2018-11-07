from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import generics, filters, views
from rest_framework.response import Response
from .serializers import CarSerializer, PassengerSerializer, UserSerializer, ProjectSerializer
from .models import Car, Passenger, Project
from rest_framework.permissions import IsAuthenticated


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


class CurrentUserRetrieveView(views.APIView):
    def get(self, request):
        return Response(
            UserSerializer(request.user).data
        )


class ProjectsListView(generics.ListAPIView):
    serializer_class = ProjectSerializer
    queryset = Project.objects.all()
    authentication_classes = (IsAuthenticated,)
    filter_backends = (filters.OrderingFilter, filters.SearchFilter, DjangoFilterBackend,)
    search_fields = (
        'project_title',
        'project_description',
    )