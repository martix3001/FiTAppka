import { signOut } from "firebase/auth";
import { auth } from "../firebase";

/**
 * Function to log out the current user.
 * @returns A promise that resolves when the user is logged out.
 */
export function logoutUser() {
  return signOut(auth)
    .then(() => {
      console.log("User logged out successfully.");
    })
    .catch((error) => {
      throw new Error(`Error logging out: ${error.message}`);
    });
}