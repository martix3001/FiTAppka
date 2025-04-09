import Sheet from "@mui/joy/Sheet";
import { CssVarsProvider } from "@mui/joy/styles";
import Typography from "@mui/joy/Typography";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import { useState, useEffect } from "react";
import { signInUser } from "../../../../firebase/auth/signIn";
import { NavLink, useNavigate } from "react-router";
import useAuth from "../../../../contexts/auth/useAuth";

export default function Login() {
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
      const user = await signInUser(email, password);
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
            <Typography level="body-sm">Log in to continue.</Typography>
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
            Log in
          </Button>
          <Typography
            endDecorator={
              <NavLink to={"/register"} className="text-blue-700">
                Sign up
              </NavLink>
            }
            fontSize="sm"
            sx={{ alignSelf: "center" }}
          >
            Don't have an account?{" "}
          </Typography>
          {message && <p className="text-center mt-4">{message}</p>}
        </Sheet>
      </CssVarsProvider>
    </>
  );
}
