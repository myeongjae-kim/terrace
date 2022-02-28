import {
  createGenerateClassName,
  createTheme as createThemeV4,
  ThemeOptions as ThemeOptionsV4
} from "@material-ui/core/styles";
import { createTheme as createThemeV5, ThemeOptions as ThemeOptionsV5 } from "@mui/material/styles";
import {lightBlue, teal, red} from "@mui/material/colors";

const primary = {
  light: "#53adf1",
  main: "#3073b3",
  dark: "#00498f",
  contrastText: "#fff"
};

const createThemeOptions: (prefersDarkMode: boolean) => ThemeOptionsV4 | ThemeOptionsV5 = (prefersDarkMode) => ({
  palette: {
    type: prefersDarkMode ? "dark" : "light",
    primary: prefersDarkMode ? lightBlue : primary,
    secondary: teal,
    error: red,
    background: {
      default: prefersDarkMode ? "#0a1929" : "#fafafa",
      paper: prefersDarkMode ? "#001e3c" : "#fafafa",
    }
  },
  typography: {
    fontWeightRegular: 300,
    body2: {
      fontSize: "0.9rem",
    },
    h1: {
      fontSize: "3rem",
      fontWeight: 100
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 100
    },
    h3: {
      fontSize: "1.75rem"
    },
    h4: {
      fontSize: "1.5rem"
    },
    h5: {
      fontSize: "1.25rem"
    },
    h6: {
      fontSize: "1.125rem"
    },
    fontFamily: [
      "Source Sans Pro",
      "\"Noto Sans KR\"",
      "-apple-system",
      "BlinkMacSystemFont",
      "\"Segoe UI\"",
      "\"Helvetica Neue\"",
      "Arial",
      "sans-serif",
      "\"Apple Color Emoji\"",
      "\"Segoe UI Emoji\"",
      "\"Segoe UI Symbol\"",
    ].join(","),
  },
});

// Create a theme instance.
const themesV4 = (prefersDarkMode: boolean) => createThemeV4(createThemeOptions(prefersDarkMode) as ThemeOptionsV4);
const themesV5 = (prefersDarkMode: boolean) => createThemeV5(createThemeOptions(prefersDarkMode) as ThemeOptionsV5);

export const darkThemeV4 = themesV4(true);
export const brightThemeV4 = themesV4(false);

export const darkThemeV5 = themesV5(true);
export const brightThemeV5 = themesV5(false);

export const generateClassName = createGenerateClassName({
  // By enabling this option, if you have non-MUI elements (e.g. `<div />`)
  // using MUI classes (e.g. `.MuiButton`) they will lose styles.
  // Make sure to convert them to use `styled()` or `<Box />` first.
  disableGlobal: true,
  // Class names will receive this seed to avoid name collisions.
  seed: "mui-jss",
});
