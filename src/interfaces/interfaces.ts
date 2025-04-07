export interface LoginFormValues {
  email: string;
  password: string;
}

export interface UserFormValues {
  email: string;
  password: string;
  displayName: string;
}
import { User } from "firebase/auth"; //type User import

//IAuth context
export interface IAuth {
  user: User | null; //type User comes from firebase
  loading: boolean;
  signIn: (creds: LoginFormValues) => void;
  signUp: (creds: UserFormValues) => void;
  signOut: () => void;
}
