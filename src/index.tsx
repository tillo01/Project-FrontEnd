/** @format */

import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import reportWebVitals from "./reportWebVitals";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./app/components/MaterialTheme";
import { BrowserRouter as Router } from "react-router-dom";
import "../src/css/index.css";
import App from "./app/App";
import ContextProvider from "./app/context/Context.Provider";
import "./utils/i18n";
const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
   <React.StrictMode>
      <Provider store={store}>
         <ContextProvider>
            <ThemeProvider theme={theme}>
               <CssBaseline />
               <Router>
                  <App />
               </Router>
            </ThemeProvider>
         </ContextProvider>
      </Provider>
   </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
