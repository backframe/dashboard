import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import Index from "./pages";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter basename="/admin">
      <AppRoutes />
    </BrowserRouter>
  </React.StrictMode>
);

function AppRoutes() {
  return (
    <Routes>
      <Route index element={<Index />} />
    </Routes>
  );
}
