

import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { loginUser, registerUser } from "../api/auth";
import { useToast } from "@/components/ui/use-toast";

interface AuthPageProps {
  onLogin: () => void;
}

const AuthPage = ({ onLogin }: AuthPageProps) => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { toast } = useToast();
  const location = useLocation();
  const role = location.state?.role || "patient"; // default role

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    if (isLogin) {
      const res = await loginUser(username, password);
      localStorage.setItem("token", res.token); // ✅ store token
      toast({ title: "Logged in!", description: res.user.username });
      onLogin();
    } else {
      await registerUser(username, password, role);
      toast({ title: "Signup complete!", description: "You can now log in." });
      setIsLogin(true);
    }
  } catch (err: any) {
    toast({
      title: "Error",
      description: err.message || "Something went wrong.",
      variant: "destructive",
    });
  }
};

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm space-y-4"
      >
        <h2 className="text-2xl font-semibold text-center">
          {isLogin ? "Login" : "Sign Up"}
        </h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />

        {!isLogin && (
          <div className="text-sm text-gray-600">
            Role: <b>{role}</b>
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          {isLogin ? "Login" : "Sign Up"}
        </button>

        <p className="text-center text-sm">
          {isLogin ? "Don't have an account?" : "Already registered?"}{" "}
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-600 underline"
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
      </form>
    </div>
  );
};

export default AuthPage;

