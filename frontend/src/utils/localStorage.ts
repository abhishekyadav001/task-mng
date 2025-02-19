export const getLocalStorageItem = (key: any) => {
  return JSON.parse(localStorage.getItem(key));
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
