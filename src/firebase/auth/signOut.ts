import { signOut } from "firebase/auth";
import { auth } from "../firebase";

signOut(auth)
  .then(() => {
    // Sign-out successful.
  })
  .catch((error) => {
    throw new Error(`Error (${error.code}): ${error.message}`);
  });
