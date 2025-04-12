import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";

/**
 * Function to delete a meal plan from Firestore.
 * @param mealPlanId - The ID of the meal plan to delete.
 */
export async function deleteMealPlan(mealPlanId: string) {
  if (!mealPlanId) {
    throw new Error("Meal Plan ID is required to delete a meal plan.");
  }

  try {
    const mealPlanDocRef = doc(db, "mealPlans", mealPlanId);
    await deleteDoc(mealPlanDocRef);
    console.log(`Meal plan with ID ${mealPlanId} deleted successfully.`);
  } catch (error) {
    console.error("Error deleting meal plan:", error);
    throw new Error("Failed to delete meal plan.");
  }
}