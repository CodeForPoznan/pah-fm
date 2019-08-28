from django.core.management.base import BaseCommand
from django.db.utils import IntegrityError

from fleet_management.models import User


class Command(BaseCommand):

    """Create PAH fleet management admin."""

    help = "Create PAH fleet management admin."

    def add_arguments(self, parser):
        parser.add_argument('username', type=str)
        parser.add_argument('password', type=str)
        parser.add_argument('country', type=str)
        parser.add_argument(
            '--django-admin',
            action='store_true',
            dest='django_admin',
        )

    def handle(self, *args, **options):
        """Create PAH fleet management admin."""
        try:
            user = User.objects.create_user(
                username=options['username'],
                email=options['username'],
                password=options['password'],
                is_superuser=options['django_admin'],
                is_staff=options['django_admin'],
                country=options['country'],
                is_active=True
            )
        except IntegrityError:
            self.stdout.write(self.style.ERROR('User already exists'))
        else:
            user.save()
            self.stdout.write(self.style.SUCCESS('User successfully created'))
