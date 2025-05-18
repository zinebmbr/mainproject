import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { AppWrapper } from "./components/common/PageMeta.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import axios from "axios";

async function bootstrap() {
  await axios.get("http://main.local/sanctum/csrf-cookie", {
    withCredentials: true,
  });
}
bootstrap()
  .catch(err => console.error("CSRF bootstrap failed:", err))
  .finally(() => {
    createRoot(document.getElementById("root")).render(
      <StrictMode>
        <BrowserRouter>
          <ThemeProvider>
            <AuthProvider>
              <AppWrapper>
                <App />
              </AppWrapper>
            </AuthProvider>
          </ThemeProvider>
        </BrowserRouter>
      </StrictMode>
    );
  });
