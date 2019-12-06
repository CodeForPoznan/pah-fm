from secrets import randbits

from django.conf import settings
from rest_framework.test import APISimpleTestCase
from fleet_management.crypto import (
    sign,
    verify,
    inverse_of,
    is_prime,
    find_prime,
    find_p_q_phi,
    find_pair_of_keys,
    hash_dict,
)


class CryptoTest(APISimpleTestCase):
    def setUp(self) -> None:
        self.n_tests = 1000
        self.keys = [find_pair_of_keys() for _ in range(self.n_tests)]

    def test_sign_and_verify(self):
        for pub, priv in self.keys:
            message = randbits(settings.RSA_NUMBER_OF_BITS)
            cipher = sign(message, priv)
            self.assertTrue(verify(message, cipher, pub))
            self.assertFalse(verify(message + 1, cipher, pub))

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

    def test_find_prime(self):
        for _ in range(self.n_tests):
            prime = find_prime(settings.RSA_NUMBER_OF_BITS)
            self.assertTrue(is_prime(prime))

    def test_find_p_q_phi(self):
        for _ in range(self.n_tests):
            p, q, phi = find_p_q_phi()
            my_phi = (p - 1) * (q - 1)
            self.assertTrue(is_prime(p))
            self.assertTrue(is_prime(q))
            self.assertEqual(phi, my_phi)

    def test_hash_dict(self):
        self.assertEqual(hash_dict({}), 5381)
        self.assertEqual(hash_dict({1: 1}), 177622)
        self.assertEqual(hash_dict({1: 1, "asd": "asd"}), 490842)
        self.assertEqual(hash_dict({1: 1, "asd": "asd", 9: [1, 2, 3]}), 344180)
        self.assertEqual(hash_dict({1: {2: {3: {4: {5: {}}}}}}), 5381)
        self.assertEqual(hash_dict({1: {2: {3: {4: {5: "x"}}}}}), 177693)
