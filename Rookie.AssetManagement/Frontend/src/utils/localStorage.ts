export const getLocalStorage = (key: string): string | undefined => {
  try {
    const value = localStorage.getItem(key);
    if (value === null) {
      return '';
    }
    return JSON.parse(value);
  } catch (err) {
    return undefined;
  }
};

export const setLocalStorage = (key: string, value: any) => {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (err) {
  }
};

export const removeLocalStorage = (key: string) => {
  localStorage.removeItem(key);
};
