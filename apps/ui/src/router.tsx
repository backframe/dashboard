import { BrowserRouter, Route, Routes } from "react-router-dom";
import IndexPage from "./pages";

export function Router() {
  return (
    <BrowserRouter basename="/_admin">
      <div className="text-slate-900">
        <Routes>
          <Route index path="/" element={<IndexPage />} />
          <Route path="*" element={<IndexPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
