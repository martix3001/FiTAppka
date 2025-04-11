import { Outlet, useNavigate } from "react-router";
import useAuth from "../../contexts/auth/useAuth";
import { logoutUser } from "../../firebase/auth/logoutUser";
import PWABadge from "../../components/PWABadge";
import { UserRoundCog } from "lucide-react";

export default function DashboardLayout() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="flex flex-col fixed w-full">
      <div className="bg-[#52AB9E] text-white p-4 flex justify-between items-center">
        <div className="">
          <button
            onClick={handleLogout}
            className="bg-red-500 px-4 py-2 rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
        <div className="font-extrabold text-gray-600 text-5xl">FitApp</div>
        <div>
          <UserRoundCog
            onClick={() => navigate("/dashboard/settings")}
            className="hover:cursor-pointer"
            size={35}
            color="white"
          />
        </div>
      </div>

      {/* <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
        <span>Logged in as: {user.email}</span>
        <button
          onClick={handleLogout}
          className="bg-red-500 px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </header> */}

      {/* Navigation Buttons for Testing */}
      {/* <nav className="bg-gray-100 p-4 flex gap-4">
        <button
          onClick={() => navigate("/dashboard/add-water")}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Add Water
        </button>
        <button
          onClick={() => navigate("/dashboard/register-product")}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Register Product
        </button>
        <button
          onClick={() => navigate("/dashboard/meal-plan")}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Meal Plan
        </button>
        <button
          onClick={() => navigate("/dashboard/about")}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          About
        </button>
        <button
          onClick={() => navigate("/dashboard/exercise")}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Exercise
        </button>
        <button
          onClick={() => navigate("/dashboard/progress-gallery")}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Progress Gallery
        </button>
        <button
          onClick={() => navigate("/dashboard/settings")}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Settings
        </button>
      </nav> */}

      {/* Main Content */}
      <main className="">
        <Outlet />
      </main>

      <PWABadge />
    </div>
  );
}
