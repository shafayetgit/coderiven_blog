import { createTheme } from "@mui/material";

const dark = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#1F1315",
    },
    primary: {
      // main: "#FF5733", // Same primary color to maintain branding
      main: "#BBBBBB",
    },
    secondary: {
      main: "#0096FF", // A brighter shade of blue for better contrast
    },
    text: {
      primary: "#BBBBBB", // Light text for better visibility on dark backgrounds
      secondary: "#FFFFFF", // White gray for secondary text
    },
    custom: {
      transparent: "rgba(0, 0, 0, 0.87)", // Fully transparent black
      black: "#FFFFFF", // White to complement dark mode
    },
  },
  typography: {
    fontFamily: "'Inter', 'Roboto', 'Poppins', sans-serif", // Keep font consistency
    fontSize: 14, // Base font size
    h1: {
      fontWeight: 700,
      fontSize: "2.5rem",
      color: "#FFFFFF", // Ensure headings are visible
    },
    h2: {
      fontWeight: 600,
      fontSize: "2rem",
      color: "#FFFFFF",
    },
    body1: {
      fontWeight: 400,
      fontSize: "1.1rem",
      color: "#BBBBBB", // Softer contrast for body text
    },
    body2: {
      fontWeight: 400,
      fontSize: "1rem",
      color: "#AAAAAA", // Slightly lighter than body1
    },
  },
});

export default dark;
