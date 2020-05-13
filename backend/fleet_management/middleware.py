from django.utils import timezone

from fleet_management.models import User


class UpdateLastSeenMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)

        if hasattr(request, 'user'):
            user = User.objects.get(id=request.user.id)
            user.last_seen = timezone.now()
            user.save()

        return response
