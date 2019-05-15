export const totalMileageReducer
  = (total, current) => total + (current.endMileage - current.startMileage);
