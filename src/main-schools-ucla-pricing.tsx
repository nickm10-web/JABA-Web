import React from "react";
import ReactDOM from "react-dom/client";

import ForSchoolsPage from "./pages/for-schools";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ForSchoolsPage bare ucla pricing />
  </React.StrictMode>,
);
