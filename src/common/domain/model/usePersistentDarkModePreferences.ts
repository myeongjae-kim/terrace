import * as React from "react";
import {isServer} from "src/util";

const persist = (key: string, value: boolean) => {
  if (!isServer()) {
    localStorage.setItem(key, String(value));
  }
};

const isPersisted = (key: string) => {
  if (isServer()) {
    return null;
  }

  const value = localStorage.getItem(key);

  return null != value;
};

const getPersisted = (key: string) => {
  if (isServer()) {
    return null;
  }

  const value = localStorage.getItem(key);

  return value == null ? value : value === "true";
};

let initialized = false;

export const usePersistentDarkModePreference = (persistentKey: string): [boolean, () => void] => {
  let darkMode : boolean | null = true;
  if (!isServer()) {
    darkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
  }

  if (!initialized) {
    if (isPersisted(persistentKey)) {
      darkMode = getPersisted(persistentKey);
    } else {
      persist(persistentKey, darkMode as boolean);
    }
    initialized = true;
  }

  const [prefersDarkMode, setDarkModePreference] = React.useState(darkMode as boolean);

  const toggle = React.useCallback(() => {
    setDarkModePreference(!prefersDarkMode);
    persist(persistentKey, !prefersDarkMode);
  }, [prefersDarkMode, persistentKey]);
  return [prefersDarkMode, toggle];
};
