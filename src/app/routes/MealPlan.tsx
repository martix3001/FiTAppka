import { NavLink, Outlet } from "react-router";
import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import useAuth from "../../contexts/auth/useAuth";
import { assignMealPlanToUser } from "../../firebase/db/createUserDatabase";
import { deleteMealPlan } from "../../firebase/db/deleteMealPlan";

export default function MealPlan() {
  const { user } = useAuth();
  const [mealPlans, setMealPlans] = useState([]);

  useEffect(() => {
    const fetchMealPlans = async () => {
      if (!user) return;

      try {
        const mealPlanRef = collection(db, "mealPlans");
        const q = query(mealPlanRef, where("userId", "==", user.uid)); // Filter by userId
        const snapshot = await getDocs(q);
        const plans = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMealPlans(plans);
      } catch (error) {
        console.error("Error fetching meal plans:", error);
      }
    };

    fetchMealPlans();
  }, [user]);

  const handleAssignMealPlan = async (mealPlanId: string) => {
    if (!user) return;
    try {
      await assignMealPlanToUser(user.uid, mealPlanId);
      alert("Meal plan assigned successfully!");
    } catch (error) {
      console.error("Error assigning meal plan:", error);
    }
  };

  const handleDeleteMealPlan = async (mealPlanId: string) => {
    try {
      await deleteMealPlan(mealPlanId);
      setMealPlans((prevPlans) => prevPlans.filter((plan) => plan.id !== mealPlanId));
    } catch (error) {
      console.error("Error deleting meal plan:", error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Meal Plan Page</h1>
      <NavLink to="add" className="text-blue-500">
        Add Meal Plan
      </NavLink>
      <div className="space-y-4">
        {mealPlans.map((plan) => (
          <div
            key={plan.id}
            className="p-4 border rounded shadow flex justify-between items-center"
          >
            <div>
              <h2 className="text-lg font-semibold">{plan.name}</h2>
              <p className="text-sm text-gray-600">{plan.description}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleAssignMealPlan(plan.id)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
              >
                Add
              </button>
              <button
                onClick={() => handleDeleteMealPlan(plan.id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      <Outlet />
    </div>
  );
}
