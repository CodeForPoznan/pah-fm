from rest_framework import permissions
from fleet_management.models import User


class UserHasGroupPermission(permissions.BasePermission):
    message = (
        "You are not allowed to log in because you do not belong to any group. "
        "Please contact admins."
    )

    def has_permission(self, request, view):
        try:
            return User.objects.get(
                username=request.data.get("username")
            ).groups.exists()
        except User.DoesNotExist:
            return False
