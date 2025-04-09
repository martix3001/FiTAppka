import { createContext } from "react";
import { AuthContextType } from "../../interfaces/interfaces";

const AuthContext = createContext<AuthContextType | null>(null);

export default AuthContext;
