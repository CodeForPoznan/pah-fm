const getItem = (item) => {
  const result = localStorage.getItem(item);
  return result ? JSON.parse(result) : result;
};

const setItem = (key, item) => localStorage.setItem(key, JSON.stringify(item));

const removeItem = item => localStorage.removeItem(item);

export {
  setItem,
  getItem,
  removeItem,
};
