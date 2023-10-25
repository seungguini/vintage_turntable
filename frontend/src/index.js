import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./App.css";
import App from "./App";
// import { Leva } from "leva";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Suspense fallback={null}>
    <App />
  </Suspense>
);
