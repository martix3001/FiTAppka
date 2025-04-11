import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

/**
 * Function to create a Firestore database entry for a new user.
 * @param userId - The unique ID of the user.
 * @param userData - Additional user data to store in the database.
 * @returns A promise that resolves when the database entry is created.
 */
export async function createUserDatabase(
  userId: string,
  userData: Record<string, unknown> = {}
) {
  if (!userId) {
    throw new Error("User ID is required to create a database entry.");
  }

  try {
    const userDocRef = doc(db, "users", userId);
    await setDoc(userDocRef, {
      ...userData,
      createdAt: new Date().toISOString(),
    });
    console.log(`Database created for user: ${userId}`);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error creating user database:", error.message);
      throw new Error(`Failed to create database for user: ${error.message}`);
    } else {
      console.error("Unknown error occurred while creating user database.");
      throw new Error(
        "An unknown error occurred while creating the user database."
      );
    }
  }
}
