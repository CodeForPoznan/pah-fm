from rest_framework import views
from rest_framework.response import Response

from .serializers import UserSerializer


class CurrentUserRetrieveView(views.APIView):
    def get(self, request):
        return Response(
            UserSerializer(request.user).data
        )
