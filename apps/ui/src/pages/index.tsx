import Login from "./login";
import Register from "./register";

// If not, navigate to register
export default function Index() {
  const realQueryParams = new URLSearchParams(window.location.search);
  if (realQueryParams.has("bf_installer")) {
    return <Register />;
  }
  return <Login />;
}
