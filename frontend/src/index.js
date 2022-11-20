import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import './index.css'
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* this will provide info related to routing to all other components in our app */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
