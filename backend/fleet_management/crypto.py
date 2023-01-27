from hashlib import md5
from math import floor, sqrt
from secrets import randbits
from collections import namedtuple

from django.conf import settings


PublicKey = namedtuple("PublicKey", "n e")
PrivateKey = namedtuple("PrivateKey", "n d")


def sign(message: int, priv: PrivateKey) -> int:
    return pow(message, priv.d, priv.n)


def verify(message: int, signature: int, pub: PublicKey) -> bool:
    return pow(signature, pub.e, pub.n) == message % pub.n


def inverse_of(a: int, b: int) -> int:
    """Returns n^-1 (mod p)."""
    x0, x1, y0, y1 = 1, 0, 0, 1
    oa, ob = a, b

    while b != 0:
        q = a // b
        a, b = b, a % b
        x0, x1 = x1, x0 - q * x1
        y0, y1 = y1, y0 - q * y1

    if x0 < 0:
        x0 += ob

    if y0 < 0:
        y0 += oa

    # when a and b are not relatively prime
    if a != 1 or (oa * x0) % ob != 1:
        return -1

    return x0


def is_prime(number: int) -> bool:
    """Check if provided number is prime."""
    if number < 10:
        return number in {2, 3, 5, 7}

    if not (number & 1):
        return False

    for i in range(2, floor(sqrt(number)) + 2):
        if number % i == 0:
            return False

    return True


def find_prime(bits: int) -> int:
    """Returns prime number with specified amount of bits."""
    while True:
        prime = randbits(bits) | 1
        while prime.bit_length() <= bits:
            if is_prime(prime):
                return prime
            prime += 2


def find_p_q_phi() -> (int, int, int):
    """Returns RSA key components."""
    limit = (2**settings.RSA_BIT_LENGTH) // 2
    p_bits = settings.RSA_BIT_LENGTH // 2 + 3
    q_bits = settings.RSA_BIT_LENGTH // 2 - 3
    p, q = find_prime(p_bits), find_prime(q_bits)

    other_p = False
    while p == q or p * q >= limit:
        if other_p:
            p = find_prime(p_bits)
        else:
            q = find_prime(q_bits)
        other_p = not other_p

    p, q = max(p, q), min(p, q)

    return p, q, (p - 1) * (q - 1)


def find_pair_of_keys() -> (PublicKey, PrivateKey):
    """Returns pair of public and private keys for RSA."""
    exp = settings.RSA_PUBLIC_EXP

    while True:
        p, q, phi = find_p_q_phi()
        d = inverse_of(exp, phi)
        if d != -1:
            break

    return PublicKey(p * q, exp), PrivateKey(p * q, d)


def hash_dict(d: dict, depth=5) -> int:
    def flatten(obj, dep=depth, sep=",") -> str:
        if depth < 0:
            return ""
        if type(obj) in [list, dict]:
            values = getattr(obj, "values", obj.__iter__)()
            return sep.join(map(lambda x: flatten(x, dep - 1, sep), values))
        return str(obj)

    val = flatten(d, depth).encode()
    val = md5(val).hexdigest()
    val = int(val[-6:], 16)

    return val % 2**settings.RSA_BIT_LENGTH
