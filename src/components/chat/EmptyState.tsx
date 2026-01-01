import React from "react";
import { Button } from "@/components/ui/button";
import { FlameKindling } from "lucide-react";

interface EmptyStateProps {
  onNewChat: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ onNewChat }) => {
  return (
    <div className="text-center max-w-2xl">
      <div className="mb-6 flex justify-center">
        <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center">
          <FlameKindling className="w-10 h-10 text-primary-foreground" strokeWidth={2} />
        </div>
      </div>
      <h2 className="text-3xl font-bold mb-4 text-foreground">
        Welcome to WildFire Reasoning System
      </h2>
      <p className="text-muted-foreground mb-8 text-lg">
        Advanced Visual Question Answering system for wildfire monitoring,
        analysis, and prediction. Upload images or CSV data to begin your
        analysis.
      </p>
      <Button
        size="lg"
        className="bg-primary hover:bg-primary/90"
        onClick={onNewChat}
      >
        Start New Chat
      </Button>
    </div>
  );
};

export default EmptyState;
