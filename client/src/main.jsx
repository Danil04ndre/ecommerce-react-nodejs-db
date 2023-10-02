import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { FormProvider } from "./context/FormContext.jsx";
import { DashboardProvider } from "./context/DashboardContext.jsx";
import { UserProvider } from "./context/UserContext.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <FormProvider>
        <DashboardProvider>
          <UserProvider>
            <App />
          </UserProvider>
        </DashboardProvider>
      </FormProvider>
    </BrowserRouter>
  </React.StrictMode>
);
