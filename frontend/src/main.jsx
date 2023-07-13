import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
// Browser Router
import { BrowserRouter } from "react-router-dom";
// Redux
import { Provider } from "react-redux";
import store from "./redux/store.js";
// Paypal
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PayPalScriptProvider deferLoading={true}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PayPalScriptProvider>
    </Provider>
  </React.StrictMode>
);
