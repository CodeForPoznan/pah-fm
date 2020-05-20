import { TOKEN } from './state';

export const SET_TOKEN = 'SET_TOKEN';
export const CLEAR_SESSION = 'CLEAR_SESSION';

export default {
  [SET_TOKEN]: (state, token) => {
    Object.assign(state, { [TOKEN]: token });
  },
  [CLEAR_SESSION]: (state) => {
    Object.assign(state, { [TOKEN]: null });
  },
};
