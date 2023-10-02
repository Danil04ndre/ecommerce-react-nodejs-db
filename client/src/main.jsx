import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { FormProvider } from "./context/FormContext.jsx";
import "./index.css";
import { DashboardProvider } from "./context/DashboardContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <FormProvider>
        <DashboardProvider>
        <App />
        </DashboardProvider>
      </FormProvider>
    </BrowserRouter>
  </React.StrictMode>
);
