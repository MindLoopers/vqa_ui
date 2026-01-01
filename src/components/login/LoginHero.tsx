import React from "react";
import { FlameKindling } from "lucide-react";

const LoginHero: React.FC = () => {
  return (
    <div className="hidden lg:flex lg:w-1/2 bg-primary text-primary-foreground p-12 flex-col justify-center relative overflow-hidden">
      {/* Subtle background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-primary/80" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-foreground/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-foreground/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-lg mx-auto space-y-8 text-center relative z-10">
        <div className="flex flex-col items-center gap-4 animate-in fade-in duration-700">
          <div className="w-28 h-28 rounded-full bg-primary-foreground flex items-center justify-center shadow-2xl hover:scale-105 transition-transform duration-300">
            <FlameKindling
              className="w-16 h-16 text-primary"
              strokeWidth={2}
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold">WildFire Reasoning System</h1>
            <p className="text-sm opacity-90">
              AI powered Advanced Visual Question Answering system for wildfire
              monitoring, analysis, and prediction.
            </p>
          </div>
        </div>

        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
          <h2 className="text-4xl font-bold leading-tight">
            Analysis with Images & Tabular Data
          </h2>
          <p className="text-lg opacity-90">
            Access historical wildfire data and get instant AI-powered
            predictions and reasoning for emergency response decisions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginHero;
