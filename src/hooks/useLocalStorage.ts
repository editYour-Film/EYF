import { useEffect, useState } from "react";

export function getStoredValue<T>(key: string, initialValue: T) {
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  } catch (error) {
    return initialValue;
  }
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
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log(error);
    }
  };

  return [
    getStoredValue(key, undefined)
      ? getStoredValue(key, undefined)
      : initialValue,
    setValue,
  ] as const;
}

export default useLocalStorage;
