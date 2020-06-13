import { getToday } from '../../../services/time';
import data, {
  NEW_DRIVE_FORM,
  CLEAR_NEW_DRIVE_FORM,
} from '../../../store/modules/data';

const { mutations } = data;

describe('Data Module', () => {
  it('CLEAR_NEW_DRIVE_FORM perserves the car and sets date', () => {
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

    mutations[CLEAR_NEW_DRIVE_FORM](state);

    expect(state[NEW_DRIVE_FORM]).toStrictEqual({
      date: getToday(),
      car: 4,
      description: '',
      startMileage: '',
      endMileage: '',
      project: '',
      passenger: '',
      startLocation: '',
      endLocation: '',
    });
  });
});
