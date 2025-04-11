import { doc, updateDoc, increment } from "firebase/firestore";
import { db } from "../firebase";

/**
 * Function to add steps to the user's progress.
 * @param userId - The unique ID of the user.
 * @param amount - The number of steps to add.
 */
export async function addSteps(userId: string, amount: number) {
  if (!userId) {
    throw new Error("User ID is required to update step progress.");
  }

  try {
    const userDocRef = doc(db, "users", userId);
    await updateDoc(userDocRef, {
      steps: increment(amount),
    });
    console.log(`Added ${amount} steps for user: ${userId}`);
  } catch (error) {
    console.error("Error updating step progress:", error);
    throw new Error("Failed to update step progress.");
  }
}