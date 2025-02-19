export const getLocalStorageItem = (key: string) => {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : null;
};

export const setLocalStorageItem = (key: string, data: string) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const removeLocalStorageItem = (key: string) => {
  return localStorage.removeItem(key);
};

export const clearLocalStorage = () => {
  return localStorage.clear();
};
