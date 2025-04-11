import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase.ts";
import { createUserDatabase } from "../db/createUserDatabase.ts";

/**
 * Function to create a new user with email and password.
 * @param email - The email address of the user.
 * @param password - The password for the user.
 * @returns A promise that resolves with the user credentials or rejects with an error.
 */
export function createNewUser(email: string, password: string) {
  return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      return createUserDatabase(user.uid, { email: user.email }).then(
        () => user
      );
    })
    .catch((error) => {
      throw new Error(`Error (${error.code}): ${error.message}`);
    });
}
