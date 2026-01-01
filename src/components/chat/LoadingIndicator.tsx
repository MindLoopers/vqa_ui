import React from "react";

const LoadingIndicator: React.FC = () => {
  return (
    <div className="flex justify-start">
      <div className="w-full rounded-lg p-4 bg-muted rounded-bl-none">
        <div className="flex items-center space-x-3">
          <div className="relative w-10 h-10">
            <div className="absolute inset-0 rounded-full border-t-2 border-r-2 border-primary animate-spin"></div>
            <div className="absolute inset-1 rounded-full border-b-2 border-l-2 border-accent animate-spin animation-delay-500"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></div>
            </div>
          </div>
          <div className="text-sm text-foreground/70 font-medium">
            Thinking...
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingIndicator;
