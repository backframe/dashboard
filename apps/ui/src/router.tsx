import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import IndexPage from "./pages";
import AppPage from "./pages/app";

export function Router() {
  return (
    <BrowserRouter basename="/_admin">
      <div className="text-slate-900">
        <Routes>
          <Route index path="/" element={<IndexPage />} />
          <Route path="/app" element={<AppPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
