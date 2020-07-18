from django.contrib.auth.models import Group
from rest_framework import permissions
from .constants import Groups


def is_in_group(user, group_name):
    try:
        return Group.objects.get(name=group_name).user_set.filter(id=user.id).exists()
    except Group.DoesNotExist:
        return None


class GroupPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        required_groups_mapping = getattr(view, "required_groups", {})

        required_groups = required_groups_mapping.get(request.method, [])

        return all(
            [
                is_in_group(request.user, group_name)
                if group_name != "__all__"
                else True
                for group_name in required_groups
            ]
        )


all_passenger_methods = {
    "GET": [Groups.Passenger.name],
    "POST": [Groups.Passenger.name],
    "PUT": [Groups.Passenger.name],
    "DELETE": [Groups.Passenger.name],
}

all_driver_methods = {
    "GET": [Groups.Driver.name],
    "POST": [Groups.Driver.name],
    "PUT": [Groups.Driver.name],
    "DELETE": [Groups.Driver.name],
}
