import {
  INCORRECT_DRIVE_ENTRIES,
  SYNC_ITEM_SUCCESS,
  VERIFICATION_TOKEN,
  SYNC_ITEM_FAILURE,
  UNSYNCHRONISED_DRIVES,
} from './constants';

export const SET_USER = 'SET_USER';
export const SET_HASH = 'SET_HASH';
export const SET_LOGIN_PROGRESS = 'SET_LOGIN_PROGRESS';
export const SET_LOGIN_ERROR = 'SET_LOGIN_ERROR';
export const ADD_DRIVE = 'ADD_DRIVE';
export const SET_UPDATE_READY = 'SET_UPDATE_READY';
export const SET_IS_CONNECTED = 'SET_IS_CONNECTED';
export const SET_LANG = 'SET_LANG';
export const SET_VERIFICATION_TOKEN_ACTIVE = 'SET_VERIFICATION_TOKEN_ACTIVE';
export const SET_VERIFICATION_TOKEN_SUBMISSION_PROGRESS =
  'SET_VERIFICATION_TOKEN_SUBMISSION_PROGRESS';

export const mutations = {
  [SYNC_ITEM_SUCCESS](state, timestamp) {
    Object.assign(state, {
      [UNSYNCHRONISED_DRIVES]: state[UNSYNCHRONISED_DRIVES].filter(
        drive => drive.timestamp !== timestamp
      ),
    });
  },
  [SYNC_ITEM_FAILURE](state, timestamp) {
    const newIncorrectEntries = [
      ...state[INCORRECT_DRIVE_ENTRIES],
      state[UNSYNCHRONISED_DRIVES].find(
        drive => drive.timestamp === timestamp
      ),
    ];

    Object.assign(state, {
      [INCORRECT_DRIVE_ENTRIES]: newIncorrectEntries,
      [UNSYNCHRONISED_DRIVES]: state[UNSYNCHRONISED_DRIVES].filter(
        drive => drive.timestamp !== timestamp
      ),
    });
  },
  [SET_USER](state, user) {
    Object.assign(state, { user });
  },
  [SET_HASH](state, hash) {
    Object.assign(state, { hash });
  },
  [SET_LOGIN_PROGRESS](state, loginInProgress) {
    Object.assign(state, { loginInProgress });
  },
  [SET_LOGIN_ERROR](state, loginError) {
    Object.assign(state, { loginError });
  },
  [ADD_DRIVE](state, drive) {
    Object.assign(state, {
      [UNSYNCHRONISED_DRIVES]: [
        ...state[UNSYNCHRONISED_DRIVES],
        Object.assign({}, drive),
      ],
    });
  },
  [SET_UPDATE_READY](state, isReady) {
    Object.assign(state, { updateReady: isReady });
  },
  [SET_IS_CONNECTED](state, isOnline) {
    Object.assign(state, { isOnline });
  },
  [SET_LANG](state, language) {
    Object.assign(state, { language });
  },
  [SET_VERIFICATION_TOKEN_ACTIVE](state, { token, isActive }) {
    Object.assign(state, {
      [VERIFICATION_TOKEN]: { token, isActive },
    });
  },
  [SET_VERIFICATION_TOKEN_SUBMISSION_PROGRESS](state, inProgress) {
    Object.assign(state[VERIFICATION_TOKEN], { inProgress });
  },
};
