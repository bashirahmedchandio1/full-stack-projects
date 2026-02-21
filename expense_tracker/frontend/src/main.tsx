import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { UIProvider } from "./context/ui-context";
import "./index.css";
import { App } from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <UIProvider>
        <App />
      </UIProvider>
    </BrowserRouter>
  </StrictMode>,
);
