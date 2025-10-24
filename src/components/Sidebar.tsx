import {
  MessageSquare,
  BarChart3,
  Plus,
  FlameKindling,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useNavigate, useLocation } from "react-router-dom";

interface SidebarProps {
  chatHistories?: Array<{ id: string; title: string; date: string }>;
  activeChatId?: string | null;
  onChatSelect?: (id: string) => void;
  onNewChat?: () => void;
  showAnalyticsMetrics?: boolean;
}

const Sidebar = ({
  chatHistories = [],
  activeChatId,
  onChatSelect,
  onNewChat,
  showAnalyticsMetrics = false,
}: SidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isChat = location.pathname === "/";
  const isAnalytics = location.pathname === "/analytics";

  return (
    <div className="w-72 bg-card border-r border-border h-screen flex flex-col">
      <div className="p-4 flex items-center justify-center">
        <button
          onClick={() => navigate("/")}
          className="text-xl font-semibold text-foreground flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <FlameKindling className="w-5 h-5 text-primary-foreground" />
          </div>
          Wildfire VQA
        </button>
      </div>

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

      <div className="flex-1 overflow-y-auto">
        {isChat && (
          <>
            <div className="p-3 border-b">
              <Button
                className="w-full bg-[#1E40AF] hover:bg-[#1E40AF]/90 text-white"
                onClick={onNewChat}
              >
                <Plus className="w-4 h-4 mr-2" />
                New Chat
              </Button>
            </div>

            <div className="space-y-1 px-3 py-2">
              {chatHistories.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-40 text-muted-foreground text-sm">
                  <MessageSquare className="w-12 h-12 mb-2 opacity-20" />
                  No chat history yet
                </div>
              ) : (
                chatHistories.map((chat, index) => (
                  <button
                    key={chat.id}
                    onClick={() => onChatSelect?.(chat.id)}
                    className={cn(
                      "w-full text-left px-3 py-2.5 rounded-md text-sm transition-colors",
                      "hover:bg-[#C7D4FD]",
                      activeChatId === chat.id && "bg-[#C7D4FD] text-foreground"
                    )}
                  >
                    <div className="font-medium truncate">
                      {chat.title.startsWith("New Chat")
                        ? "New chat"
                        : chat.title}
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5">
                      {chat.date}
                    </div>
                  </button>
                ))
              )}
            </div>
          </>
        )}

        {showAnalyticsMetrics && (
          <div className="p-3 space-y-3">
            <Card className="bg-background">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-medium text-muted-foreground">
                  Total Incidents
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">293</div>
                <p className="text-xs text-muted-foreground flex items-center mt-1">
                  <TrendingUp className="w-3 h-3 mr-1 text-green-500" />
                  +12% from 2020-2024
                </p>
              </CardContent>
            </Card>

            <Card className="bg-background">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-medium text-muted-foreground">
                  Acres Burned
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">40.1M</div>
                <p className="text-xs text-muted-foreground">
                  Total area affected
                </p>
              </CardContent>
            </Card>

            <Card className="bg-background">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-medium text-muted-foreground">
                  Avg Severity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">6.2/10</div>
                <p className="text-xs text-muted-foreground">
                  Fire intensity index
                </p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-border text-xs text-muted-foreground">
        <div>WildFire Reasoning System</div>
        <div>© 2025 WildFire Reasoning System. All rights reserved.</div>
      </div>
    </div>
  );
};

export default Sidebar;
