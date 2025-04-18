import { useState } from "react";
import { useNavigate } from "react-router";
import useAuth from "../../contexts/auth/useAuth";
import { createMealPlan } from "../../firebase/db/createUserDatabase";

export default function MealPlanAdd() {
  const { user } = useAuth();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [calories, setCalories] = useState(0); // New calories field
  const navigate = useNavigate();

  const handleCreateMealPlan = async () => {
    if (!user) return;

    try {
      await createMealPlan(user.uid, name, description, calories); // Pass calories
      navigate("/dashboard/meal-plan");
    } catch (error) {
      console.error("Error creating meal plan:", error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Add Meal Plan</h1>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Meal Plan Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <textarea
          placeholder="Short Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          placeholder="Calories"
          value={calories}
          onChange={(e) => setCalories(Number(e.target.value))}
          className="w-full p-2 border rounded"
        />
        <button
          onClick={handleCreateMealPlan}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Create Meal Plan
        </button>
      </div>
    </div>
  );
}
