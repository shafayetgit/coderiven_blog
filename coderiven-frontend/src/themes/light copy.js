import { createTheme } from "@mui/material";

const light = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#cd1d8d",
    },
    // secondary: {
    //   main: "#03DAC5",
    // },
    // tertiary: {
    //   default: "#BB86FC",
    // },
    // background: {
    //   default: "#FFFFFF",
    //   paper: "#F7F7F7",
    //   transparent: "#BB86FC",
    // },
    custom: {
      transparent: '#F9FAFB00', // Custom key
      // transparent: '#F9FAFBCC', // Custom key
      // transparent: '#E0DAD180', // Custom key

      black: '#000000',
    },

    text: {
      primary: "#333333",
      secondary: "#666666",
    },
    action: {
      active: "#6200EE",
    },
  },
});

export default light;


