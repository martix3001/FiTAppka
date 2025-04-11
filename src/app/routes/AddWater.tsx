import { useState, useEffect } from "react";
import { GlassWater } from "lucide-react";
import { useNavigate } from "react-router";
import { addWater } from "../../firebase/db/addWater";
import useAuth from "../../contexts/auth/useAuth";

export default function AddWater() {
  const [waterIntake, setWaterIntake] = useState(0);
  const navigate = useNavigate();
  const { user } = useAuth();

  // Reset water intake daily
  useEffect(() => {
    const now = new Date();
    const millisUntilMidnight =
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1).getTime() -
      now.getTime();

    const resetTimer = setTimeout(() => {
      setWaterIntake(0);
    }, millisUntilMidnight);

    return () => clearTimeout(resetTimer);
  }, [waterIntake]);

  const handleAddGlass = () => {
    const glassSize = 200;
    if (user) {
      addWater(user.uid, glassSize);
      setWaterIntake(waterIntake + glassSize);
      navigate("/dashboard");
    } else {
      console.log("No user logged");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md w-full max-w-sm text-center">
        <GlassWater className="w-24 h-24 text-blue-500 mb-6" />
        <button
          onClick={handleAddGlass}
          className="bg-teal-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-teal-600 transition"
        >
          Dodaj szklankę wody
        </button>
      </div>
    </div>
  );
}
