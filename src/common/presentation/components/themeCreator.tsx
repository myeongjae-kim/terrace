import {lightBlue, red, teal} from "@mui/material/colors";
import {createTheme} from "@mui/material/styles";

const primary = {
  light: "#53adf1",
  main: "#3073b3",
  dark: "#00498f",
  contrastText: "#fff"
};

// Create a theme instance.
const themeCreator = (prefersDarkMode: boolean) => createTheme({
  palette: {
    mode: prefersDarkMode ? "dark" : "light",
    primary: prefersDarkMode ? lightBlue : primary,
    secondary: teal,
    error: red,
    background: {
      default: prefersDarkMode ? "#303030" : "#fafafa"
    }
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
