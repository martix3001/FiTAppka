import { doc, setDoc, collection, addDoc, updateDoc, arrayUnion } from "firebase/firestore";
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
      water: 0,
      calories: 0,
      steps: 0,
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

/**
 * Function to create a new meal plan in Firestore.
 * @param userId - The ID of the user creating the meal plan.
 * @param name - The name of the meal plan.
 * @param description - A short description of the meal plan.
 * @param calories - The calorie value of the meal plan.
 * @returns A promise that resolves with the created meal plan's ID.
 */
export async function createMealPlan(userId: string, name: string, description: string, calories: number) {
  if (!userId) {
    throw new Error("User ID is required to create a meal plan.");
  }

  try {
    const mealPlanRef = collection(db, "mealPlans");
    const docRef = await addDoc(mealPlanRef, {
      userId,
      name,
      description,
      calories, // Add calories field
      createdAt: new Date().toISOString(),
    });
    console.log(`Meal plan created with ID: ${docRef.id}`);
    return docRef.id;
  } catch (error) {
    console.error("Error creating meal plan:", error);
    throw new Error("Failed to create meal plan.");
  }
}

/**
 * Function to assign a meal plan to a user's database.
 * @param userId - The unique ID of the user.
 * @param mealPlanId - The ID of the meal plan to assign.
 */
export async function assignMealPlanToUser(userId: string, mealPlanId: string) {
  if (!userId || !mealPlanId) {
    throw new Error("User ID and Meal Plan ID are required.");
  }

  try {
    const userDocRef = doc(db, "users", userId);
    await updateDoc(userDocRef, {
      mealPlans: arrayUnion(mealPlanId),
    });
    console.log(`Meal plan ${mealPlanId} assigned to user ${userId}`);
  } catch (error) {
    console.error("Error assigning meal plan to user:", error);
    throw new Error("Failed to assign meal plan to user.");
  }
}
