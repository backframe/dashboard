import { BrowserRouter, Route, Routes } from "react-router-dom";
import IndexPage from "./pages";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";

export function Router() {
  return (
    <BrowserRouter basename="/_admin">
      <div className="text-slate-900">
        <Routes>
          <Route index path="/" element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
