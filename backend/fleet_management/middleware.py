from django.utils import timezone
from django.utils.deprecation import MiddlewareMixin

from fleet_management.models import User


class UpdateLastSeenMiddleware(MiddlewareMixin):
    def process_request(self, request):
        if hasattr(request, 'user'):
            User.objects.filter(id=request.user.id).update(last_seen=timezone.now())
