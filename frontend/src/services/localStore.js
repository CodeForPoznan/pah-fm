export const getItem = (item) => {
  const result = localStorage.getItem(item);
  try {
    return JSON.parse(result);
  } catch (_e) {
    return result;
  }
};

export const setItem = (key, item) => localStorage.setItem(key, JSON.stringify(item));

export const removeItem = (item) => localStorage.removeItem(item);

export const clearStorage = () => localStorage.clear();
