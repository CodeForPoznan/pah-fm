import { TOKEN } from './state';

export const SET_TOKEN = 'SET_TOKEN';

export default {
  [SET_TOKEN]: (state, token) => {
    Object.assign(state, { [TOKEN]: token });
  },
};
