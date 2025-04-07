import { createBrowserRouter } from "react-router";
import App from "./App";
import Login from "./routes/auth/login/Login";
import Register from "./routes/auth/register/Register";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />
  }
]);
