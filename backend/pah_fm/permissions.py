from rest_framework import permissions
from fleet_management.models import User

class UserHasGroupPermission(permissions.BasePermission):
    message = 'You are not allowed to log in because you are not associated to proper group.'

    def has_permission(self, request, view):
        try:
            return User.objects.get(email=request.data.get('username')).groups.exists()
        except User.DoesNotExist:
            return False
