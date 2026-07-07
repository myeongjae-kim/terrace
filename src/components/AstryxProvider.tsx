import { Theme } from "@astryxdesign/core";
import type { ThemeMode } from "@astryxdesign/core/theme";
import { neutralTheme } from "@astryxdesign/theme-neutral";
import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type AstryxThemeContextValue = {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
};

const AstryxThemeContext = createContext<AstryxThemeContextValue | null>(null);

const storageKey = "theme";

function readStoredMode(): ThemeMode {
  if (typeof window === "undefined") {
    return "system";
  }

  const stored = window.localStorage.getItem(storageKey);
  return stored === "light" || stored === "dark" || stored === "system"
    ? stored
    : "system";
}

export function AstryxProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<ThemeMode>("system");

  useEffect(() => {
    setModeState(readStoredMode());
  }, []);

  const value = useMemo<AstryxThemeContextValue>(
    () => ({
      mode,
      setMode(nextMode) {
        setModeState(nextMode);
        window.localStorage.setItem(storageKey, nextMode);
      },
    }),
    [mode],
  );

  return (
    <AstryxThemeContext.Provider value={value}>
      <Theme theme={neutralTheme} mode={mode}>
        {children}
      </Theme>
    </AstryxThemeContext.Provider>
  );
}

export function useAstryxTheme() {
  const context = useContext(AstryxThemeContext);

  if (!context) {
    throw new Error("useAstryxTheme must be used within AstryxProvider");
  }

  return context;
}
