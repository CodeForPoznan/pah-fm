import { RSA_NUMBER_OF_BITS } from '../store/constants';

export const flatten = (obj, depth = 5, sep = ',') => {
  if (depth < 0 || typeof obj === 'undefined') {
    return '';
  }

  // we want to mimic the python
  if (typeof obj === 'boolean') {
    return obj ? 'True' : 'False';
  }

  if (obj.constructor === Array || obj.constructor === Object) {
    const values = [];
    Object.entries(obj).forEach(v => values.push(flatten(v[1], depth - 1, sep)));
    return values.join(sep);
  }

  return String(obj);
};

export const hashDict = (dict, depth = 5) => {
  let val = 5381;
  flatten(dict, depth).forEach((c) => {
    val = (val * 33) + c.charCodeAt(0);
  });

  return val % (2 ** RSA_NUMBER_OF_BITS);
};

const modexp = (base, exp, mod) => {
  const b = base % mod;
  if (exp === 0) return 1;
  if (exp === 1) return b;

  const res = modexp(b * b, Math.trunc(exp / 2), mod);
  if (exp % 2) return (b * res) % mod;
  return res;
};

export const sign = (msg, priv) => modexp(msg, priv.d, priv.n);

export const verify = (msg, sgn, pub) => modexp(sgn, pub.e, pub.n) === msg % pub.n;
