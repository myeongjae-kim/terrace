import * as React from "react";
import { useMediaQuery } from "@material-ui/core";
import { isServer } from "src/util";

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
  const [prefersDarkMode, setDarkModePreference] = React.useState(useMediaQuery("(prefers-color-scheme: dark)"));
  const persisted = getPersisted(persistentKey);

  if (!initialized && persisted) {
    setDarkModePreference(persisted);
  }

  initialized = true;
  persist(persistentKey, prefersDarkMode);

  const toggle = React.useCallback(() => setDarkModePreference(!prefersDarkMode), [prefersDarkMode]);
  return [prefersDarkMode, toggle];
};