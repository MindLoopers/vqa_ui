import React from "react";
import { Bot } from "lucide-react";

const LoadingIndicator: React.FC = () => {
  return (
    <div className="flex gap-3 flex-row">
      <div className="flex-shrink-0 mt-1">
        <div className="w-8 h-8 rounded-full bg-[#475569] flex items-center justify-center shadow-sm">
          <Bot className="w-4 h-4 text-white" />
        </div>
      </div>
      <div className="bg-white border border-[#E2E8F0] rounded-2xl rounded-tl-sm px-5 py-3.5 shadow-sm">
        <div className="flex items-center gap-1.5">
          <span
            className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
            style={{ animationDelay: "0ms", animationDuration: "1s" }}
          />
          <span
            className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
            style={{ animationDelay: "180ms", animationDuration: "1s" }}
          />
          <span
            className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
            style={{ animationDelay: "360ms", animationDuration: "1s" }}
          />
        </div>
      </div>
    </div>
  );
};

export default LoadingIndicator;
