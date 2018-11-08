from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import generics, filters, views
from rest_framework.response import Response
from .serializers import UserSerializer, ProjectSerializer
from .models import Project
from rest_framework.permissions import IsAuthenticated


class CurrentUserRetrieveView(views.APIView):
    def get(self, request):
        return Response(
            UserSerializer(request.user).data
        )


class ProjectsListView(generics.ListAPIView):
    authentication_classes = (IsAuthenticated,)
    serializer_class = ProjectSerializer
    queryset = Project.objects.all()
    filter_backends = (filters.OrderingFilter, filters.SearchFilter, DjangoFilterBackend,)
    search_fields = (
        'project_title',
        'project_description',
        'routes',
    )
