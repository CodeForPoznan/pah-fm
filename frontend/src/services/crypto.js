import md5 from'js-md5';
import modexp from 'mod-exp';

export const flatten = (obj, depth = 5, sep = ",") => {
  if (depth < 0 || typeof obj === "undefined") {
    return "";
  }

  // we want to mimic the python
  if (typeof obj === "boolean") {
      return obj ? "True" : "False";
  }

  if (obj.constructor === Array || obj.constructor === Object) {
    let values = [];
    Object.entries(obj).forEach(v => values.push(flatten(v[1], depth-1, sep)));
    return values.join(sep);
  }

  return String(obj);
};

export const hash = (dict) => md5(flatten(dict)).substr(-6);

export const sign = (msg, priv) => modexp(msg, priv.d, priv.n);

export const verify = (msg, sgn, pub) => modexp(sgn, pub.e, pub.n) === msg % pub.n;
