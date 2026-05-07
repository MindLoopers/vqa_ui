import React from "react";
import { Button } from "@/components/ui/button";
import { FlameKindling, MessageSquarePlus } from "lucide-react";

interface EmptyStateProps {
  onNewChat: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ onNewChat }) => {
  return (
    <div className="text-center max-w-lg px-6">
      <div className="mb-6 flex justify-center">
        <div className="w-20 h-20 rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-primary/25">
          <FlameKindling className="w-10 h-10 text-primary-foreground" strokeWidth={1.75} />
        </div>
      </div>
      <h2 className="text-2xl font-bold mb-3 text-foreground tracking-tight">
        WildFire Reasoning System
      </h2>
      <p className="text-muted-foreground mb-8 text-base leading-relaxed">
        Advanced Visual Question Answering for wildfire monitoring, analysis, and prediction.
        Upload images or CSV data to begin your analysis.
      </p>
      <Button
        size="lg"
        className="bg-primary hover:bg-primary/90 shadow-sm shadow-primary/30 gap-2 rounded-xl"
        onClick={onNewChat}
      >
        <MessageSquarePlus className="w-4 h-4" />
        Start New Chat
      </Button>
    </div>
  );
};

export default EmptyState;
