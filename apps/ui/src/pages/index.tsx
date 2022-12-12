// Call api to see if admin user exists,

import { Navigate } from "react-router-dom";

// If not, navigate to register
export default function Index() {
  const realQueryParams = new URLSearchParams(window.location.search);
  if (realQueryParams.has("bf_installer")) {
    return <Navigate to="/register" />;
  }
  return <Navigate to="/login" />;
}
