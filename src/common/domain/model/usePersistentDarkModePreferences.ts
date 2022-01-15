import * as React from "react";
import {isServer} from "src/util";

const persist = (key: string, value: boolean) => {
  if (!isServer()) {
    localStorage.setItem(key, String(value));
  }
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
  let systemDefault : boolean | null = null;
  if (!isServer()) {
    const mediaQuery = "(prefers-color-scheme: dark)";
    systemDefault = window.matchMedia(mediaQuery).matches;
  }

  const [prefersDarkMode, setDarkModePreference] = React.useState(
    systemDefault == null ? true : systemDefault
  );
  const persisted = getPersisted(persistentKey);

  if (!initialized && persisted) {
    setDarkModePreference(persisted);
  }

  initialized = true;
  persist(persistentKey, prefersDarkMode);

  const toggle = React.useCallback(() => setDarkModePreference(!prefersDarkMode), [prefersDarkMode]);
  return [prefersDarkMode, toggle];
};
