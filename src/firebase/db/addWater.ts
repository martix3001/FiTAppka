import { doc, updateDoc, increment } from "firebase/firestore";
import { db } from "../firebase";

/**
 * Function to add water to the user's progress.
 * @param userId - The unique ID of the user.
 * @param amount - The amount of water to add (in ml).
 */
export async function addWater(userId: string, amount: number) {
  if (!userId) {
    throw new Error("User ID is required to update water progress.");
  }

  try {
    const userDocRef = doc(db, "users", userId);
    await updateDoc(userDocRef, {
      water: increment(amount),
    });
    console.log(`Added ${amount} ml of water for user: ${userId}`);
  } catch (error) {
    console.error("Error updating water progress:", error);
    throw new Error("Failed to update water progress.");
  }
}