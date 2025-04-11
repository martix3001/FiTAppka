import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
import AuthProvider from "../contexts/auth/authProvider";
import AddWater from "./routes/AddWater";
import AuthLayout from "./routes/auth/AuthLayout";
import Login from "./routes/auth/login/Login";
import Register from "./routes/auth/register/Register";
import DashboardLayout from "./routes/DashboardLayout";
import Exercise from "./routes/Exercise";
import MealPlan from "./routes/MealPlan";
import RegisterProduct from "./routes/RegisterProduct";
import About from "./routes/About";
import ProgressGallery from "./routes/ProgressGallery";
import Settings from "./routes/Settings";
import MealPlanAdd from "./routes/MealPlanAdd";
import ExerciseAdd from "./routes/ExerciseAdd";
import ExerciseEdit from "./routes/ExerciseEdit";
import useAuth from "../contexts/auth/useAuth";

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
        element: <DashboardLayout />,
        children: [
          { path: "add-water", element: <AddWater /> },
          { path: "register-product", element: <RegisterProduct /> },
          {
            path: "meal-plan",
            element: <MealPlan />,
            children: [{ path: "add", element: <MealPlanAdd /> }],
          },
          { path: "about", element: <About /> },
          {
            path: "exercise",
            element: <Exercise />,
            children: [
              { path: "add", element: <ExerciseAdd /> },
              { path: "edit", element: <ExerciseEdit /> },
            ],
          },
          { path: "progress-gallery", element: <ProgressGallery /> },
          { path: "settings", element: <Settings /> },
        ],
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
