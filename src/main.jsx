import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css"; // index.css 파일을 import합니다.
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
