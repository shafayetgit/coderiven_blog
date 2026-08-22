import { RouterProvider } from "react-router";
import { CssBaseline, ThemeProvider } from "@mui/material";

import ErrorBoundary from "./components/ErrorBoundary";
import routes from "./routes";
import dark from "./themes/dark";
import light from "./themes/light";

import useScrollBackgroundColor from "./hooks/useScrollBackgroundColor";
import { useSelector } from "react-redux";

const App = () => {
  const themeMode = useSelector((state) => state.app.mode)
  const selectedTheme = themeMode === 'dark' ? dark : light

  useScrollBackgroundColor()
  
  return (
    <ThemeProvider theme={selectedTheme}>
      <CssBaseline />
      <ErrorBoundary>
        <RouterProvider router={routes} />
      </ErrorBoundary>
    </ThemeProvider>
  );
};

export default App;
