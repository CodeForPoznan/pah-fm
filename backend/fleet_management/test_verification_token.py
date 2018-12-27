from datetime import datetime, timedelta
from uuid import uuid4

from django.test import TestCase
from django.urls import reverse
from freezegun import freeze_time
from rest_framework import status
from rest_framework.test import APITransactionTestCase

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


class VerificationTokenViewTest(APITransactionTestCase):

    def setUp(self):
        passenger = PassengerFactory.create()
        drive = DriveFactory.create()
        self.token = VerificationTokenFactory.create(
            drive=drive, passenger=passenger,
        )  # type: VerificationToken

        self.url = reverse(
            'verification-token',
            kwargs={'token': self.token.token},
        )
        self.payload = {
            'isOk': True,
            'comment': 'Somme comment',
        }

    def test_patch_404_token_does_not_exist(self):
        res = self.client.patch(
            reverse('verification-token', kwargs={'token': uuid4()}),
            self.payload,
            format='json',
        )
        self.assertEqual(res.status_code, status.HTTP_404_NOT_FOUND)

    def test_patch_200_expired_token(self):
        now = datetime.utcnow()
        with freeze_time(now + VerificationToken.EXPIRATION_DELTA + timedelta(seconds=1)):
            res = self.client.patch(self.url, self.payload, format='json')

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertDictEqual(res.json(), {
            'isExpired': True,
            'isConfirmed': self.token.is_confirmed,
        })

    def test_patch_200_confirmed(self):
        self.token.is_confirmed = True
        self.token.is_ok = True
        self.token.save()

        res = self.client.patch(self.url, self.payload, format='json')

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertDictEqual(res.json(), {
            'isExpired': self.token.is_expired,
            'isConfirmed': self.token.is_confirmed,
        })

    def test_patch_200_confirmation_ok(self):
        self.payload['isOk'] = True
        res = self.client.patch(self.url, self.payload, format='json')

        self.assertEqual(res.status_code, status.HTTP_200_OK)

        token = VerificationToken.objects.get(token=self.token.token)
        self.assertTrue(token.is_ok)
        self.assertTrue(token.is_confirmed)

    def test_patch_200_confirmation_not_ok(self):
        self.payload['isOk'] = False
        res = self.client.patch(self.url, self.payload, format='json')

        self.assertEqual(res.status_code, status.HTTP_200_OK)

        token = VerificationToken.objects.get(token=self.token.token)
        self.assertFalse(token.is_ok)
        self.assertTrue(token.is_confirmed)

    def test_patch_400_validation(self):
        res = self.client.patch(self.url, {}, format='json')

        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('comment', res.json())
        self.assertIn('isOk', res.json())

    def test_get_404_token_does_not_exist(self):
        res = self.client.get(
            reverse('verification-token', kwargs={'token': uuid4()}),
        )
        self.assertEqual(res.status_code, status.HTTP_404_NOT_FOUND)

    def test_get_404_retrieves_token(self):
        res = self.client.get(self.url)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertDictEqual(res.json(), {
            'isExpired': self.token.is_expired,
            'isConfirmed': self.token.is_confirmed,
        })
