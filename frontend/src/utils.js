export const totalMileageReducer
  = (total, current) => total + (current.endMileage - current.startMileage);

export const totalMileageFilter
= (current) => {
  let currentMonth = new Date().getMonth() + 1;
  currentMonth = currentMonth < 10 ? `0${currentMonth}` : currentMonth;
  const currentYear = new Date().getFullYear();
  const currentMonthYear = `${currentYear}-${currentMonth}`;
  const monthYear = current.date.slice(0, 7);
  return monthYear === currentMonthYear;
};
