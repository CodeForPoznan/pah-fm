const makeSetAction = name => `SET_${name}`;

const LOADING = 'loading';
const DATA = 'data';
const ERRORS = 'errors';

const USER = 'user';
const ROUTES = 'routes';

export const SET_USER = makeSetAction(USER);
export const SET_ROUTES = makeSetAction(ROUTES);

export const SET_LOGIN_PROGRESS = 'SET_LOGIN_PROGRESS';
export const SET_LOGIN_ERROR = 'SET_LOGIN_ERROR';
export const ADD_ROUTE = 'ADD_ROUTE';
export const SET_UPDATE_READY = 'SET_UPDATE_READY';
export const SET_IS_CONNECTED = 'SET_IS_CONNECTED';

const makeMutation = name => (state, data) =>
  Object.assign(
    {},
    state,
    {
      [name]: {
        [LOADING]: false,
        [DATA]: data,
        [ERRORS]: [],
      },
    },
  );


export const mutations = {
  [SET_USER](state, user) {
    Object.assign(state, { user });
  },
  [SET_ROUTES]: (state, data) => {
    // eslint-disable-next-line
    debugger;
    const a = makeMutation(ROUTES)(state, data);
    return a;
  },
  [SET_LOGIN_PROGRESS](state, loginInProgress) {
    Object.assign(state, { loginInProgress });
  },
  [SET_LOGIN_ERROR](state, loginError) {
    Object.assign(state, { loginError });
  },
  [ADD_ROUTE](state, route) {
    Object.assign(state, { routes: [...state.routes, Object.assign({}, route)] });
  },
  [SET_UPDATE_READY](state, isReady) {
    Object.assign(state, { updateReady: isReady });
  },
  [SET_IS_CONNECTED](state, isOnline) {
    Object.assign(state, { isOnline });
  },
};
