// src/pages/DashboardPage.tsx

import useAuth from "../../contexts/auth/useAuth";
import { logoutUser } from "../../firebase/auth/logoutUser";

export default function Dashboard() {
  const { user } = useAuth();

  const handleLogout = async () => {
    try {
      await logoutUser();
      console.log("Logged out successfully.");
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Logout error:", error.message);
      } else {
        console.error("An unknown logout error occurred.");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-semibold mb-6">
        Hello, {user?.email || "User"}
      </h1>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-6 py-3 rounded hover:bg-red-600 transition"
      >
        Logout
      </button>
    </div>
  );
}
