import { format } from 'date-fns';

export const totalMileageReducer
  = (total, current) => total + (current.endMileage - current.startMileage);

export const totalMileageFilter
  = drive => drive.date.slice(0, 7) === format(new Date(), 'YYYY-MM');

export const padWithZeros = (num, width) => {
  const n = `${num}`;
  if (n.length >= width) return n;
  return new Array((width + 1) - n.length).join('0') + n;
};
