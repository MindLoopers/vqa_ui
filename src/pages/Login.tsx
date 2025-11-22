import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "@/components/LoginForm";
import { FlameKindling } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");

  const handleLogin = (username: string, password: string) => {
    // Simple authentication for prototype
    if (username === "mindloop" && password === "admin") {
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("user", username);
      navigate("/");
      return true;
    } else {
      setError("Invalid username or password");
      return false;
    }
  };

  return (
    <div className="h-screen flex overflow-hidden">
      {/* Left Side - Firefighter Information */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary text-primary-foreground p-12 flex-col justify-center relative overflow-hidden">
        {/* Subtle background effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-primary/80" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-foreground/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-foreground/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        
        <div className="max-w-lg mx-auto space-y-8 text-center relative z-10">
          <div className="flex flex-col items-center gap-4 animate-in fade-in duration-700">
            <div className="w-28 h-28 rounded-full bg-primary-foreground flex items-center justify-center shadow-2xl hover:scale-105 transition-transform duration-300">
              <FlameKindling className="w-16 h-16 text-primary" strokeWidth={2} />
            </div>
            <div>
              <h1 className="text-3xl font-bold">WildFire Reasoning System</h1>
              <p className="text-sm opacity-90">AI powered Advanced Visual Question Answering system for wildfire monitoring, analysis, and prediction.</p>
            </div>
          </div>

          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
            <h2 className="text-4xl font-bold leading-tight">
              Analysis with Images & Tabular Data
            </h2>
            <p className="text-lg opacity-90">
              Access historical wildfire data and get instant AI-powered predictions and reasoning for emergency response decisions.
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-background p-8 overflow-y-auto">
        <div className="w-full max-w-md">
          {/* Mobile Header */}
          <div className="lg:hidden mb-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center">
                <FlameKindling className="w-9 h-9 text-primary-foreground" strokeWidth={2} />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-1">WildFire Reasoning System</h1>
            <p className="text-sm text-muted-foreground">Emergency Response Platform</p>
          </div>

          {/* Login Form */}
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">Welcome Back</h2>
              <p className="text-muted-foreground">Sign in to access the wildfire emergency response system</p>
            </div>

            <LoginForm onLogin={handleLogin} error={error} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
