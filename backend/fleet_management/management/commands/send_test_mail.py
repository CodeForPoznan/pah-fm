from django.conf import settings
from django.core.mail import send_mail
from django.core.management.base import BaseCommand


class Command(BaseCommand):
    """Send test e-mail."""

    help = "Sends test e-mail to verify manually that e-mail is configured."

    def add_arguments(self, parser):
        parser.add_argument('email', type=str)

    def handle(self, *args, **options):
        send_mail(
            'Test e-mail from PAH Fleet Management',
            'This is a test message. Please ignore it if you don\'t know why you received it.',
            settings.EMAIL_ADDRESS,
            [options['email']],
            fail_silently=False,
        )
