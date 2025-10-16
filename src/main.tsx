import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Create React root and mount the App
const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found");
}

createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
