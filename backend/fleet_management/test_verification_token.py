from datetime import datetime, timedelta

from django.test import TestCase
from freezegun import freeze_time

from fleet_management.models import VerificationToken
from .factories import PassengerFactory, DriveFactory, VerificationTokenFactory


class VerificationTokenTest(TestCase):

    def test_is_expired(self):
        passenger = PassengerFactory.create()
        drive = DriveFactory.create()
        now = datetime.utcnow()
        with freeze_time(now):
            token = VerificationTokenFactory.create(
                drive=drive, passenger=passenger,
            )  # type: VerificationToken

        with freeze_time(now + VerificationToken.EXPIRATION_DELTA + timedelta(seconds=1)):
            self.assertTrue(token.is_expired)

        with freeze_time(now + VerificationToken.EXPIRATION_DELTA):
            self.assertFalse(token.is_expired)
