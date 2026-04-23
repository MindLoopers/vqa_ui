import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { User, Lock, Mail, Eye, EyeOff, AlertCircle } from "lucide-react";

interface LoginFormProps {
  onLogin: (email: string, password: string) => Promise<boolean>;
  onRegister: (username: string, email: string, password: string) => Promise<boolean>;
  error: string;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin, onRegister, error }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    let success = false;
    if (isRegister) {
      success = await onRegister(username, email, password);
    } else {
      success = await onLogin(email, password);
    }
    
    if (!success) {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* Username field (only for register) */}
        {isRegister && (
          <div className="flex flex-col gap-2">
            <Label htmlFor="username" className="text-sm font-semibold text-foreground">
              Username
            </Label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
              <Input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                required={isRegister}
                autoComplete="username"
                className="pl-12 h-12 bg-secondary/50 border-2 focus:bg-background transition-colors"
              />
            </div>
          </div>
        )}

        {/* Email field */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="email" className="text-sm font-semibold text-foreground">
            Email
          </Label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
            <Input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              autoComplete="email"
              className="pl-12 h-12 bg-secondary/50 border-2 focus:bg-background transition-colors"
            />
          </div>
        </div>

        {/* Password field */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="password" className="text-sm font-semibold text-foreground">
            Password
          </Label>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
            <Input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              autoComplete={isRegister ? "new-password" : "current-password"}
              className="pl-12 pr-12 h-12 bg-secondary/50 border-2 focus:bg-background transition-colors"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              tabIndex={-1}
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div className="flex items-center gap-2 p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-sm animate-in slide-in-from-top-2 duration-300">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Submit button */}
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-12 text-base font-semibold bg-primary hover:bg-primary/90 transition-all shadow-md hover:shadow-lg"
        >
          {isLoading ? "Processing..." : isRegister ? "Create Account" : "Sign In"}
        </Button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-muted-foreground">
          {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            type="button"
            onClick={() => setIsRegister(!isRegister)}
            className="font-semibold text-primary hover:underline transition-all"
          >
            {isRegister ? "Sign In" : "Create Account"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
