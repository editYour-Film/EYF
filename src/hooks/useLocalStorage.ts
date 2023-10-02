import { useEffect, useState } from "react";

export function getStoredValue<T>(key: string, initialValue: T) {
  return () => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  };
}

export function removeStorage(key: string) {
  try {
    const item = window.localStorage.getItem(key);
    if (item) window.localStorage.removeItem(key);
  } catch (error) {
    console.log(error);
    return null;
  }
}

function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(initialValue);
  useEffect(() => {
    const value = getStoredValue(key, initialValue);
    setStoredValue(value);
  }, [setStoredValue, key, initialValue]);
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  };
  return [storedValue, setValue] as const;
}

export default useLocalStorage;
