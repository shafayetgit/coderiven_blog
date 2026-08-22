import { createTheme } from "@mui/material";

const light = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#fff5f5"
    },
    primary: {
      // main: "#FF5733",
      main: "#212121",
    },
    secondary: {
      main: "#00509E",
    },
    text: {
      primary: "#333333",
      secondary: "#666666",
    },
    custom: {
      transparent: "#F9FAFB00",
      black: "#000000",
    },
  },
  typography: {
    fontFamily: "'Inter', 'Roboto', 'Poppins', sans-serif",
    fontSize: 14, // Base font size (adjust as needed)
    h1: {
      fontWeight: 700,
      fontSize: "2.5rem", // Increase size for headings
    },
    h2: {
      fontWeight: 600,
      fontSize: "2rem",
    },
    body1: {
      fontWeight: 400,
      fontSize: "1.1rem", // Slightly larger for readability
    },
    body2: {
      fontWeight: 400,
      fontSize: "1rem",
    },
  },

});

export default light;
