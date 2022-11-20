import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./index.css";
import { Index } from "./pages";
import { NotFound } from "./pages/404";
import { App } from "./pages/app";
import { Analytics } from "./pages/app/analytics";
import { Authentication } from "./pages/app/auth";
import { Database } from "./pages/app/database";
import { Overview } from "./pages/app/overview";
import { Plugins } from "./pages/app/plugins";
import { Resources } from "./pages/app/resources";
import { Storage } from "./pages/app/storage";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter basename="/admin">
      <QueryClientProvider client={queryClient}>
        <AppRoutes />
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);

function AppRoutes() {
  return (
    <Routes>
      <Route index element={<Index />} />
      <Route path="/auth" element={<Navigate to="login" />}>
        <Route path="login" element={<Index />} />
        <Route path="register" element={<Index />} />
      </Route>
      <Route path="/app" element={<App />}>
        <Route path="overview/*" element={<Overview />} />
        <Route path="analytics/*" element={<Analytics />} />
        <Route path="auth/*" element={<Authentication />} />
        <Route path="database/*" element={<Database />} />
        <Route path="plugins/*" element={<Plugins />} />
        <Route path="storage/*" element={<Storage />} />
        <Route path="resources/*" element={<Resources />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
