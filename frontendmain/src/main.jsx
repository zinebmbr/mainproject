// src/main.jsx
import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import "./index.css";

// bootstrap CSRF (optional, if using Laravel+Sanctum)
import axios from "axios";
(async () => {
  try {
    await axios.get("http://main.local/sanctum/csrf-cookie", { withCredentials: true });
  } catch (e) {
    console.error(e);
  }
})();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
