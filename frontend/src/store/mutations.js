export const SET_USER = 'SET_USER';
export const SET_LOGIN_PROGRESS = 'SET_LOGIN_PROGRESS';
export const SET_LOGIN_ERROR = 'SET_LOGIN_ERROR';
export const ADD_ROUTE = 'ADD_ROUTE';
export const SET_UPDATE_READY = 'SET_UPDATE_READY';
export const SET_IS_CONNECTED = 'SET_IS_CONNECTED';
export const SET_FETCHING_CARS_ERROR = 'SET_FETCHING_CARS_ERROR';
export const SET_FETCHING_CARS_PROGRESS = 'SET_FETCHING_CARS_PROGRESS';
export const SET_CARS = 'SET_CARS';

export const mutations = {
  [SET_USER](state, user) {
    Object.assign(state, { user });
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
  [SET_FETCHING_CARS_PROGRESS](state, fetchingCarsInProgress) {
    Object.assign(state.cars, { loading: fetchingCarsInProgress });
  },
  [SET_FETCHING_CARS_ERROR](state, fetchingCarsError) {
    Object.assign(state.cars, { error: fetchingCarsError });
  },
  [SET_CARS](state, cars) {
    Object.assign(state.cars, { data: [...cars] });
  },
};
