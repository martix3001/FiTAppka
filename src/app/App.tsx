import { useState } from "react";
import PWABadge from "../components/PWABadge.tsx";
import { createNewUser } from "../firebase/auth/newUser.ts";

export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const user = await createNewUser(email, password);
      setMessage(`User created successfully: ${user.email}`);
    } catch (error: any) {
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <>
      <h1 className="text-center text-5xl">TEST</h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-4 mt-8"
      >
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Create User
        </button>
      </form>

      {message && <p className="text-center mt-4">{message}</p>}

      {/* this things colors are broken */}
      <PWABadge />
    </>
  );
}
