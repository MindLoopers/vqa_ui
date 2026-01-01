import React from "react";
import { FlameKindling } from "lucide-react";

const MobileHeader: React.FC = () => {
  return (
    <div className="lg:hidden mb-8 text-center">
      <div className="flex justify-center mb-4">
        <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center">
          <FlameKindling
            className="w-9 h-9 text-primary-foreground"
            strokeWidth={2}
          />
        </div>
      </div>
      <h1 className="text-2xl font-bold text-foreground mb-1">
        WildFire Reasoning System
      </h1>
      <p className="text-sm text-muted-foreground">
        Emergency Response Platform
      </p>
    </div>
  );
};

export default MobileHeader;
