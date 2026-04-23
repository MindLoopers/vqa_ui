import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "../lib/api";

export const useAuth = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");

  const handleLogin = async (email: string, password: string): Promise<boolean> => {
    try {
      setError("");
      const user = await loginUser(email, password);
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("user", user.username);
      localStorage.setItem("userId", user.id);
      localStorage.setItem("loginTime", Date.now().toString());
      navigate("/");
      return true;
    } catch (err: any) {
      setError(err.message || "Invalid email or password");
      return false;
    }
  };

  const handleRegister = async (username: string, email: string, password: string): Promise<boolean> => {
    try {
      setError("");
      const user = await registerUser(username, email, password);
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("user", user.username);
      localStorage.setItem("userId", user.id);
      localStorage.setItem("loginTime", Date.now().toString());
      navigate("/");
      return true;
    } catch (err: any) {
      setError(err.message || "Registration failed");
      return false;
    }
  };

  return {
    error,
    handleLogin,
    handleRegister,
  };
};
