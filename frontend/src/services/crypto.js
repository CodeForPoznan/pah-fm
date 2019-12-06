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
  flatten(dict, depth).forEach(c => {
    val = (val * 33) + c.charCodeAt(0);
  });
  return val % (2 ** RSA_NUMBER_OF_BITS);
};

const modexp = (a, b, n) => {
  a = a % n;
  let result = 1;
  let x = a;

  while(b > 0) {
    let lsb = b % 2;
    b = Math.floor(b / 2);

    if (lsb === 1) {
      result = result * x;
      result = result % n;
    }

    x = x * x;
    x = x % n;
  }

  return result;
};

export const sign = (msg, priv) => modexp(msg, priv.d, priv.n);

export const verify = (msg, sgn, pub) => modexp(sgn, pub.e, pub.n) === msg % pub.n;
