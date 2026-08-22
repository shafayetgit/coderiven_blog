import { createRoot } from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";

import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";

const GOOGLE_OAUTH2_CLIENT_ID = import.meta.env.VITE_GOOGLE_OAUTH2_CLIENT_ID
createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <GoogleOAuthProvider clientId={GOOGLE_OAUTH2_CLIENT_ID}>
      <App />
    </GoogleOAuthProvider>
    ;
  </Provider>
);
