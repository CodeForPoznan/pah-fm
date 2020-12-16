import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';

const tokenName = 'accessToken';

export const setToken = token => {
  const { exp } = jwtDecode(token);

  const attr = {
    expires: new Date(exp * 1000),
  };

  Cookies.set(tokenName, token, attr);
}

export const clearToken = () => {
  Cookies.remove(tokenName);
}

export const getToken = () => {
  return Cookies.get(tokenName);
};
