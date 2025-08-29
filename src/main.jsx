import React, { StrictMode } from "react";
import "@styles/index.scss";
import App from "./App";
import reportWebVitals from "@/reportWebVitals";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "@styles/GlobalStyles";
import { theme } from "@utils/constants";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
);

reportWebVitals();
