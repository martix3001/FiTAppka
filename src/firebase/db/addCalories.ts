import { doc, updateDoc, increment } from "firebase/firestore";
import { db } from "../firebase";

/**
 * Function to add calories to the user's progress.
 * @param userId - The unique ID of the user.
 * @param amount - The amount of calories to add.
 */
export async function addCalories(userId: string, amount: number) {
  if (!userId) {
    throw new Error("User ID is required to update calorie progress.");
  }

  try {
    const userDocRef = doc(db, "users", userId);
    await updateDoc(userDocRef, {
      calories: increment(amount),
    });
    console.log(`Added ${amount} kcal for user: ${userId}`);
  } catch (error) {
    console.error("Error updating calorie progress:", error);
    throw new Error("Failed to update calorie progress.");
  }
}