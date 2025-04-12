import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

/**
 * Function to update the user's weight and height in the database.
 * @param userId - The unique ID of the user.
 * @param data - An object containing the weight and height to update.
 */
export async function updateUserData(userId: string, data: { weight: number; height: number }) {
  if (!userId) {
    throw new Error("User ID is required to update user data.");
  }

  try {
    const userDocRef = doc(db, "users", userId);
    await updateDoc(userDocRef, data);
    console.log(`Updated user data for user: ${userId}`, data);
  } catch (error) {
    console.error("Error updating user data:", error);
    throw new Error("Failed to update user data.");
  }
}