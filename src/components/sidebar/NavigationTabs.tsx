import React from "react";
import { Button } from "@/components/ui/button";
import { MessageSquare, BarChart3 } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const NavigationTabs: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isChat = location.pathname === "/";
  const isAnalytics = location.pathname === "/analytics";

  return (
    <div className="flex gap-2 p-3 py-0 border-border">
      <Button
        variant={isChat ? "default" : "outline"}
        size="sm"
        className={`flex-1 ${
          isChat ? "bg-[#1E40AF] hover:bg-[#1E40AF]/90 text-white" : ""
        }`}
        onClick={() => navigate("/")}
      >
        <MessageSquare className="w-4 h-4 mr-2" />
        Chat
      </Button>
      <Button
        variant={isAnalytics ? "default" : "outline"}
        size="sm"
        className={`flex-1 ${
          isAnalytics ? "bg-[#1E40AF] hover:bg-[#1E40AF]/90 text-white" : ""
        }`}
        onClick={() => navigate("/analytics")}
      >
        <BarChart3 className="w-4 h-4 mr-2" />
        Analytics
      </Button>
    </div>
  );
};

export default NavigationTabs;
