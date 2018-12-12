from django import dispatch
from django.core.mail import EmailMessage, get_connection
from django.template.loader import get_template

from pah_fm.settings import EMAIL_ADDRESS

from .models import Drive, User, Passenger

drive_created = dispatch.Signal(providing_args=['driver', 'passengers'])


@dispatch.receiver(drive_created)
def send_emails_to_passengers(sender, **kwargs):
    template = get_template('new_drive_email.html')
    subject = 'PAH drive'

    drive = Drive.objects.get(pk=kwargs['drive_id'])
    driver = User.objects.get(pk=kwargs['driver_id'])

    passengers = Passenger.objects.filter(id__in=kwargs['passengers_ids'])

    with get_connection() as connection:
        for passenger in passengers:
            message = template.render({
                'driver': driver,
                'drive': drive,
                'passenger': passenger,
            })
            address = passenger.email
            email = EmailMessage(
                subject=subject,
                body=message,
                from_email=EMAIL_ADDRESS,
                to=[address],
                connection=connection,
            )
            email.content_subtype = 'html'
            email.send()
