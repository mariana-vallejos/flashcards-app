import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { FlashcardsProvider } from "./context/FlashcardsContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <FlashcardsProvider>
        <App />
      </FlashcardsProvider>
    </BrowserRouter>
  </StrictMode>
);
