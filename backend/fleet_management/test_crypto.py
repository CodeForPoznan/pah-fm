from secrets import randbelow

from rest_framework.test import APISimpleTestCase
from fleet_management.crypto import *


class CryptoTest(APISimpleTestCase):
    def setUp(self) -> None:
        self.n_tests = 100
        self.keys = [find_pair_of_keys() for _ in range(self.n_tests)]
        self.bad_keys = [find_pair_of_keys() for _ in range(self.n_tests)]

    def test_encrypt_and_decrypt(self):
        for pub, priv in self.keys:
            message = randbelow(HALF_NUMBER)
            cipher = encrypt(message, pub)
            self.assertEqual(decrypt(cipher, priv), message)

    def test_sign_and_verify(self):
        for pub, priv in self.keys:
            message = randbelow(HALF_NUMBER)
            cipher = sign(message, priv)
            self.assertTrue(verify(message, cipher, pub))

        good_pub_keys = (k[0] for k in self.keys)
        bad_priv_keys = (k[1] for k in self.bad_keys)
        for pub, priv in zip(good_pub_keys, bad_priv_keys):
            message = randbelow(HALF_NUMBER)
            signature = sign(message, priv)
            self.assertFalse(verify(message, signature, pub))

    def test_egcd(self):
        self.assertEqual(egcd(30, 5), (5, 0, 1))
        self.assertEqual(egcd(17, 5), (1, -2, 7))
        self.assertEqual(egcd(4864, 3458), (38, 32, -45))
        self.assertEqual(egcd(234232, 774), (2, 8, -2421))
        self.assertEqual(egcd(1432, 123211), (1, -22973, 267))

    def test_inverse_of(self):
        self.assertEqual(inverse_of(2, 3), 2)
        self.assertEqual(inverse_of(53, 120), 77)
        self.assertEqual(inverse_of(1123, 18712), 17379)
        self.assertEqual(inverse_of(98751, 123719989), 68419280)
        self.assertEqual(
            inverse_of(65537, 1034776851837418226012406113933120080),
            568411228254986589811047501435713,
        )

    def test_is_prime(self):
        self.assertTrue(is_prime(2))
        self.assertTrue(is_prime(5))
        self.assertTrue(is_prime(41))
        self.assertTrue(is_prime(97571))
        self.assertTrue(is_prime(56790763))
        self.assertTrue(is_prime(967901315627))
        self.assertFalse(is_prime(1))
        self.assertFalse(is_prime(12))
        self.assertFalse(is_prime(42))
        self.assertFalse(is_prime(2737075))
        self.assertFalse(is_prime(273707521121))

    def test_find_primes(self):
        for prime in find_nearby_primes(how_many=self.n_tests):
            self.assertTrue(is_prime(prime))
