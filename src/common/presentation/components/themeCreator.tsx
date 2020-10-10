import red from "@material-ui/core/colors/red";
import { createMuiTheme } from "@material-ui/core/styles";
import { teal, lightBlue } from "@material-ui/core/colors";

const primary = {
  light: "#53adf1",
  main: "#3073b3",
  dark: "#00498f",
  contrastText: "#fff"
};

// Create a theme instance.
const themeCreator = (prefersDarkMode: boolean) => createMuiTheme({
  palette: {
    type: prefersDarkMode ? "dark" : "light",
    primary: prefersDarkMode ? lightBlue : primary,
    secondary: teal,
    error: red,
  },
  typography: {
    fontWeightRegular: 300,
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

export default themeCreator;
