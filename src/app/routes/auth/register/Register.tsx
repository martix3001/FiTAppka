import {
  CssVarsProvider,
  Sheet,
  Typography,
  FormControl,
  FormLabel,
  Input,
  Button,
} from "@mui/joy";
import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router";
import useAuth from "../../../../contexts/auth/useAuth";
import { createNewUser } from "../../../../firebase/auth/newUser";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const user = await createNewUser(email, password);
      setMessage(`User created successfully: ${user.email}`);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setMessage(`Error: ${error.message}`);
      } else {
        setMessage("An unknown error occurred.");
      }
    }
  };
  return (
    <>
      <CssVarsProvider>
        <Sheet
          sx={{
            width: 300,
            mx: "auto",
            my: 4,
            py: 3,
            px: 2,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            borderRadius: "sm",
            boxShadow: "md",
          }}
          variant="outlined"
        >
          <div>
            <Typography level="h4" component="h1">
              Welcome!
            </Typography>
            <Typography level="body-sm">Sign up to continue.</Typography>
          </div>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              name="email"
              type="email"
              placeholder="johndoe@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
              name="password"
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <Button sx={{ mt: 1 }} onClick={handleSubmit}>
            Sign up
          </Button>
          <Typography
            endDecorator={
              <NavLink to={"/login"} className="text-blue-700">
                Log in
              </NavLink>
            }
            fontSize="sm"
            sx={{ alignSelf: "center" }}
          >
            Already have an account?
          </Typography>
          {message && <p className="text-center mt-4">{message}</p>}
        </Sheet>
      </CssVarsProvider>
    </>
  );
}
