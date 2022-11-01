import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import "./App.css";
import App from "./App";
// import { Leva } from "leva";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    {/* <Leva> */}
    <Suspense fallback={null}>
      <App />
    </Suspense>
    {/* </Leva> */}
  </React.StrictMode>
);
