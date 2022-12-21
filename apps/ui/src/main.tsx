import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import "./index.css";
import { Router } from "./router";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

const client = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={client}>
      <Router />
      <ReactQueryDevtools initialIsOpen />
    </QueryClientProvider>
  );
}
