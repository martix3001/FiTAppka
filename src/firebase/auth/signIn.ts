import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase.ts";
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
