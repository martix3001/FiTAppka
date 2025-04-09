import { createBrowserRouter } from "react-router";
import App from "./App";
import Login from "./routes/auth/login/Login";
import Register from "./routes/auth/register/Register";
import ProtectedRoute from "./routes/ProtectedRoute";
import AuthLayout from "./routes/auth/AuthLayout";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      Component: ProtectedRoute,
      children: [
        { index: true, Component: App },
        {
          path: "auth",
          Component: AuthLayout,
          children: [
            { path: "login", Component: Login },
            { path: "register", Component: Register },
          ],
        },
      ],
    },
  ]
  // createRoutesFromElements(
  //   <>
  //     <Route path="/" element={<ProtectedRoute />}>
  //       <Route index element={<App />} />
  //     </Route>
  //     <Route path="/login" element={<Login />} />
  //     <Route path="/register" element={<Register />} />
  //   </>
  // )
);
