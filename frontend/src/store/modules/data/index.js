import { getField, updateField } from 'vuex-map-fields';
import { hashDict } from '../../../services/crypto';
import { padWithZeros } from '../../../utils';
import { getToday } from '../../../services/time';

export const NEW_DRIVE_FORM = 'NEW_DRIVE_FORM';

export const newDriveFormInitialState = {
  date: getToday(),
  car: '',
  description: '',
  startMileage: '',
  endMileage: '',
  project: '',
  passenger: '',
  startLocation: '',
  endLocation: '',
};

const moduleState = {
  [NEW_DRIVE_FORM]: { ...newDriveFormInitialState },
};

export const CLEAR_NEW_DRIVE_FORM = 'CLEAR_NEW_DRIVE_FORM';

const mutations = {
  updateField,
  [CLEAR_NEW_DRIVE_FORM]: (state) =>
    Object.assign(state, {
      [NEW_DRIVE_FORM]: {
        date: getToday(),
        car: state[NEW_DRIVE_FORM].car,
      },
    }),
};

const actions = {};

export const NEW_DRIVE_FORM_CHECKSUM = 'NEW_DRIVE_FORM_CHECKSUM';

const getters = {
  getField,
  [NEW_DRIVE_FORM_CHECKSUM]: (state) =>
    padWithZeros(
      hashDict({
        car: { id: state[NEW_DRIVE_FORM].car },
        project: { id: state[NEW_DRIVE_FORM].project },
        passengers: [{ id: state[NEW_DRIVE_FORM].passenger }],
        startLocation: state[NEW_DRIVE_FORM].startLocation,
        endLocation: state[NEW_DRIVE_FORM].endLocation,
        startMileage: state[NEW_DRIVE_FORM].startMileage,
        endMileage: state[NEW_DRIVE_FORM].endMileage,
      }),
      6,
    ),
};

export default {
  namespaced: true,
  state: moduleState,
  mutations,
  actions,
  getters,
};
