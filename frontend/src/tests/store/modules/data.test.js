import jest from 'jest';
import { getToday } from '../../../services/time';
import data, {
  NEW_DRIVE_FORM,
  SET_NEW_DRIVE_FORM,
  CLEAR_NEW_DRIVE_FORM,
} from '../../../store/modules/data';

const { actions } = data;

describe('Data Module', () => {
  it('CLEAR_NEW_DRIVE_FORM perserves the car and sets date', () => {
    const commit = jest.fn();

    const state = {
      [NEW_DRIVE_FORM]: {
        date: '2020-04-01',
        car: 4,
        description: '',
        startMileage: 10,
        endMileage: 270,
        project: 1,
        passenger: 8,
        startLocation: 'Poznań',
        endLocation: 'Kraków',
      },
    };

    actions[CLEAR_NEW_DRIVE_FORM]({ state, commit });

    expect(commit).toHaveBeenCalledWith(SET_NEW_DRIVE_FORM, {
      date: getToday(),
      car: 4,
    });
  });
});
