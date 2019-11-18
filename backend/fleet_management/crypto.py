from collections import namedtuple
import secrets

from django.conf import settings


EXP = settings.RSA_PUBLIC_EXPONENT
N_OF_DIGITS = settings.RSA_NUMBER_OF_DIGITS
HALF_NUMBER = 10 ** ((N_OF_DIGITS // 2) - 1) - 1
MAX_NUMBER = 10 ** (N_OF_DIGITS + 1) - 1

PublicKey = namedtuple("PublicKey", "n e")
PrivateKey = namedtuple("PrivateKey", "n d")


def encrypt(message: int, pub: PublicKey) -> int:
    assert message < pub.n, f"{message} < {pub.n}"
    return pow(message, pub.e, pub.n)


def decrypt(cipher: int, priv: PrivateKey) -> int:
    assert cipher < priv.n, f"{cipher} < {priv.n}"
    return pow(cipher, priv.d, priv.n)


def sign(message: int, priv: PrivateKey) -> int:
    assert message < priv.n, f"{message} < {priv.n}"
    return pow(message, priv.d, priv.n)


def verify(message: int, signature: int, pub: PublicKey) -> bool:
    assert message < pub.n, f"{message} < {pub.n}"
    assert signature < pub.n, f"{signature} < {pub.n}"
    return pow(signature, pub.e, pub.n) == message % pub.n


def find_pair_of_keys() -> (PublicKey, PrivateKey):
    """Returns pair of public and private keys for RSA."""
    while True:
        p, q = find_nearby_primes(HALF_NUMBER, how_many=2)
        phi = (p - 1) * (q - 1)
        n = p * q
        d = -1

        try:
            d = inverse_of(EXP, phi)
        except ValueError:
            continue
        else:
            break

    if (EXP * d) % phi != 1:
        raise ValueError("Numbers are not multiplicative inverse of n modulo phi.")

    return PublicKey(n, EXP), PrivateKey(n, d)


def egcd(a: int, b: int) -> (int, int, int):
    """Returns a three-tuple (gcd, x, y) such that
    a * x + b * y == gcd, where gcd is the greatest
    common divisor of a and b.

    This function implements the extended Euclidean
    algorithm and runs in O(log b) in the worst case.
    """
    x0, x1, y0, y1 = 1, 0, 0, 1

    while a != 0:
        q, b, a = b // a, a, b % a
        x0, x1 = x1, x0 - q * x1
        y0, y1 = y1, y0 - q * y1

    return b, y0, x0


def inverse_of(n: int, p: int) -> int:
    """Returns the multiplicative inverse of n modulo p.

    This function returns an integer m such that (n * m) % p == 1.
    """
    assert n > 1
    assert p > 1

    gcd, x, y = egcd(n, p)
    assert gcd == 1
    assert (n * x + p * y) % p == gcd
    assert (n * (x % p)) % p == 1

    if gcd != 1:
        raise ValueError(f"{n} has no multiplicative inverse mod {p}")

    return x % p


def is_prime(n: int) -> bool:
    """Check if provided number is prime using Miller-Rabin primality test."""
    assert n > 0, f"{n} > 0"

    if n < 10:
        return n in {2, 3, 5, 7}

    if not (n & 1):
        return False

    k = 11
    bits = n.bit_length()
    if bits >= 1536:
        k = 4
    if bits >= 1024:
        k = 5
    if bits >= 512:
        k = 8

    d = n - 1
    r = 0

    while not (d & 1):
        r += 1
        d >>= 1

    for _ in range(k):
        a = secrets.randbelow(n - 3) + 1

        x = pow(a, d, n)
        if x == 1 or x == n - 1:
            continue

        for _ in range(r - 1):
            x = pow(x, 2, n)
            if x == 1:
                return False
            if x == n - 1:
                break
        else:
            return False

    return True


def find_nearby_primes(max_number: int = MAX_NUMBER, how_many: int = 1) -> list:
    """Generates nearby prime numbers with values less than max_number.
    Stops after the generation of how_many prime numbers.
    """
    assert how_many > 0, f"{how_many} > 0"
    assert max_number > 3, f"{max_number > 3}"

    def new_number() -> int:
        return secrets.randbelow(max_number) | 1

    primes = []
    x = new_number()

    while how_many:
        if is_prime(x):
            how_many -= 1
            primes.append(x)

        x += 2
        if x > max_number:
            x = new_number()

    return primes
