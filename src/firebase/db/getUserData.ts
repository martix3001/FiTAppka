import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

/**
 * Fetches user data from Firestore.
 * @param userId - The unique ID of the user.
 * @returns A promise resolving to the user data or null if not found.
 */
export async function getUserData(userId: string) {
  if (!userId) {
    throw new Error("User ID is required to fetch user data.");
  }

  try {
    const userDocRef = doc(db, "users", userId);
    const userDoc = await getDoc(userDocRef);
    if (userDoc.exists()) {
      return userDoc.data();
    } else {
      console.log("No such user data found!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
}