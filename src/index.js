import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { keyCloack } from "./sso/sso-api/sso";
import { SsoProvider } from "./sso/sso";
import { ErrorProvider } from "./data-store/error-context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <ErrorProvider>
      <SsoProvider client={keyCloack}>
        <App />
      </SsoProvider>
    </ErrorProvider>
  </BrowserRouter>
);

reportWebVitals();
