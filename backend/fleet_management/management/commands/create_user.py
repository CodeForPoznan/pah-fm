from django.contrib.auth.models import Group
from django.core.management.base import BaseCommand
from django.db.utils import IntegrityError

from fleet_management.models import User


class Command(BaseCommand):
    """Create PAH fleet management admins and test users."""

    help = "Create PAH fleet management admins and test users."

    def add_arguments(self, parser):
        parser.add_argument("--username", type=str, required=True)
        parser.add_argument("--password", type=str, required=True)
        parser.add_argument("--first_name", type=str, required=False, default="")
        parser.add_argument("--last_name", type=str, required=False, default="")
        parser.add_argument("--country", type=str, required=True)
        parser.add_argument("--group", type=str, required=False, default="")
        parser.add_argument("--is_admin", type=bool, default=False)

    def handle(self, *args, **options):
        """Create PAH fleet management admin."""
        username = options["username"]
        group = options["group"]

        try:
            user = User.objects.create_user(
                username=username,
                email=options["username"],
                password=options["password"],
                first_name=options["first_name"],
                last_name=options["last_name"],
                country=options["country"],
                is_superuser=options["is_admin"],
                is_staff=options["is_admin"],
                is_active=True,
            )

            if group:
                user.groups.add(Group.objects.get(name=group))

        except IntegrityError:
            self.stdout.write(
                self.style.WARNING(f"User '{username}' already exists, skipping...")
            )

        else:
            user.save()
            self.stdout.write(
                self.style.SUCCESS(f"User {username} was successfully created.")
            )
