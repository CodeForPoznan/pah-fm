import { makeModule, makeFetchData } from './helpers';
import { namespaces, actions } from './constants';

const modules = {
  [namespaces.drives]: makeModule({
    [actions.fetchDrives]: makeFetchData('drives'),
  }),
  [namespaces.cars]: makeModule({
    [actions.fetchCars]: makeFetchData('cars'),
  }),
  [namespaces.passengers]: makeModule({
    [actions.fetchPassengers]: makeFetchData('passengers'),
  }),
};

export {
  modules,
};
