import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, db } from "../firebase.ts";
import { createUserDatabase } from "../db/createUserDatabase.ts";
import { doc, getDoc } from "firebase/firestore";
/**
 * Function to sign in a user with email and password.
 * @param email - The email address of the user.
 * @param password - The password for the user.
 * @returns A promise that resolves with the user credentials or rejects with an error.
 */
export function signInUser(email: string, password: string) {
  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      return userCredential.user;
    })
    .catch((error) => {
      throw new Error(`Error (${error.code}): ${error.message}`);
    });
}
/**
 * Function to sign in with Google and create a user database if it doesn't exist.
 * @returns A promise that resolves with the authenticated user.
 */
export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    if (user) {
      // Check if the user database entry already exists
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        // Create user database entry if it doesn't exist
        await createUserDatabase(user.uid, {
          email: user.email,
          displayName: user.displayName,
        });
      }
    }

    return user;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Google sign-in failed.");
  }
};