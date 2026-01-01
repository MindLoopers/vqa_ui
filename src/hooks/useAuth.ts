import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");

  const handleLogin = (username: string, password: string): boolean => {
    // Simple authentication for prototype
    if (username === "mindloop" && password === "admin") {
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("user", username);
      localStorage.setItem("loginTime", Date.now().toString());
      navigate("/");
      return true;
    } else {
      setError("Invalid username or password");
      return false;
    }
  };

  return {
    error,
    handleLogin,
  };
};
