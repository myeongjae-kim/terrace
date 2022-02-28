import { createTheme, ThemeOptions } from "@mui/material/styles";
import {lightBlue, teal, red} from "@mui/material/colors";

const primary = {
  light: "#53adf1",
  main: "#3073b3",
  dark: "#00498f",
  contrastText: "#fff"
};

const createThemeOptions: (prefersDarkMode: boolean) => ThemeOptions = (prefersDarkMode) => ({
  palette: {
    mode: prefersDarkMode ? "dark" : "light",
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
    body1: {
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
const themesV5 = (prefersDarkMode: boolean) => createTheme(createThemeOptions(prefersDarkMode));

export const darkThemeV5 = themesV5(true);
export const brightThemeV5 = themesV5(false);
