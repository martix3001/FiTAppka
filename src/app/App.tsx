// src/App.tsx
import { createBrowserRouter, RouterProvider, Navigate } from "react-router";
import AuthProvider from "../contexts/auth/authProvider";
import useAuth from "../contexts/auth/useAuth";
import AuthLayout from "./routes/auth/AuthLayout";
import Login from "./routes/auth/login/Login";
import Dashboard from "./routes/Dashboard";
import Register from "./routes/auth/register/Register";

const RootRedirect = () => {
  const { user } = useAuth();

  return <Navigate to={user ? "/dashboard" : "/login"} replace />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootRedirect />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
    ],
  },
]);

export default function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}
