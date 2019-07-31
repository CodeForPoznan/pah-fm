import { format } from 'date-fns';

export const totalMileageReducer
  = (total, current) => total + (current.endMileage - current.startMileage);

export const totalMileageFilter
= drive => drive.date.slice(0, 7) === format(new Date(), 'YYYY-MM');
