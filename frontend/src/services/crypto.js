import md5 from 'js-md5';
import { RSA_BIT_LENGTH } from '../store/constants';

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
  let val = md5(flatten(dict, depth));
  val = val.substr(val.length - 6);
  val = parseInt(val, 16);
  return val % (2 ** RSA_BIT_LENGTH);
};

const modexp = (base, exp, mod) => {
  const b = base % mod;
  if (exp === 0) return 1;
  if (exp === 1) return b;

  const res = modexp(b * b, Math.trunc(exp / 2), mod);
  if (exp % 2) return (b * res) % mod;
  return res;
};

const int = n => parseInt(n, 10);

export const sign = (msg, d, n) => modexp(int(msg), int(d), int(n));

export const verify = (msg, sgn, e, n) => modexp(int(sgn), int(e), int(n)) === int(msg) % int(n);
