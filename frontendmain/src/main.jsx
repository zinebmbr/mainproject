import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the CSS
import "./index.css";
import App from "./App.jsx";
import { AppWrapper } from "./components/common/PageMeta.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import axios from "axios";
import { CollaborateursProvider } from "./contexts/CollaborateursContext.jsx";

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
            <CollaborateursProvider>
              <AppWrapper>
                <App />
                <ToastContainer 
                  position="bottom-right"
                  autoClose={5000}
                  hideProgressBar={false}
                  newestOnTop
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  theme="light"
                />
              </AppWrapper>
              </CollaborateursProvider>
            </AuthProvider>
          </ThemeProvider>
        </BrowserRouter>
      </StrictMode>
    );
  });