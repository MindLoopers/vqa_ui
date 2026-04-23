import React from "react";
import LoginForm from "@/components/LoginForm";
import LoginHero from "@/components/login/LoginHero";
import MobileHeader from "@/components/login/MobileHeader";
import { useAuth } from "@/hooks/useAuth";

const Login = () => {
  const { error, handleLogin, handleRegister } = useAuth();

  return (
    <div className="h-screen flex overflow-hidden">
      <LoginHero />

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-background p-8 overflow-y-auto">
        <div className="w-full max-w-md">
          <MobileHeader />

          {/* Login Form */}
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">
                Welcome
              </h2>
              <p className="text-muted-foreground">
                Sign in or create an account to access the wildfire emergency response system
              </p>
            </div>

            <LoginForm onLogin={handleLogin} onRegister={handleRegister} error={error} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
