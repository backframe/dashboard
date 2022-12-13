import { Navigate } from "react-router-dom";

export default function App() {
  if (!localStorage.getItem("bf_admin_auth")) {
    return <Navigate to="/" />;
  }
  return <div>App</div>;
}
