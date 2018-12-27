import pytz
from datetime import datetime
from uuid import UUID

from django.test import TestCase
from freezegun import freeze_time

from fleet_management.factories import VerificationTokenFactory, PassengerFactory, DriveFactory


class VerificationTokenFactoryTest(TestCase):

    def test_creates_token(self):
        passenger = PassengerFactory.create()
        drive = DriveFactory.create()
        now = datetime.utcnow()
        now = now.replace(tzinfo=pytz.UTC)
        with freeze_time(now):
            token = VerificationTokenFactory.create(
                drive=drive, passenger=passenger,
            )

        self.assertEqual(type(token.comment), str)
        self.assertGreater(len(token.comment), 0)

        try:
            UUID(token.token, version=4)
        except ValueError:
            self.fail(f'token ${token.token} is not a valid uuid4 token')

        self.assertEqual(token.drive, drive)
        self.assertEqual(token.passenger, passenger)

        self.assertEqual(token.created_at, now)

        self.assertIsNone(token.is_ok)
        self.assertFalse(token.confirmed)
