from rest_framework_jwt.views import ObtainJSONWebToken
from rest_framework_jwt.serializers import JSONWebTokenSerializer
from pah_fm.permissions import UserHasGroupPermission


class CustomObtainJSONWebToken(ObtainJSONWebToken):
    permission_classes = [UserHasGroupPermission]
    serializer_class = JSONWebTokenSerializer
