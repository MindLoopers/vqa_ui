import {
  Plus,
  FlameKindling,
  LogOut,
  PanelLeftClose,
  PanelLeft,
  MessageSquare,
  BarChart3,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import NavigationTabs from "@/components/sidebar/NavigationTabs";
import ChatHistoryList from "@/components/sidebar/ChatHistoryList";
import AnalyticsCard from "@/components/sidebar/AnalyticsCard";

interface SidebarProps {
  chatHistories?: Array<{ id: string; title: string; date: string }>;
  activeChatId?: string | null;
  onChatSelect?: (id: string) => void;
  onNewChat?: () => void;
  onRenameChat?: (id: string, newTitle: string) => void;
  onDeleteChat?: (id: string) => void;
  showAnalyticsMetrics?: boolean;
}

const Sidebar = ({
  chatHistories = [],
  activeChatId,
  onChatSelect,
  onNewChat,
  onRenameChat,
  onDeleteChat,
  showAnalyticsMetrics = false,
}: SidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isChat = location.pathname === "/";
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div
      className={`bg-card border-r border-border h-screen flex flex-col transition-all duration-300 ${
        isCollapsed ? "w-16" : "w-72"
      }`}
    >
      <div className="p-4 flex items-center justify-between">
        {!isCollapsed && (
          <button
            onClick={() => navigate("/")}
            className="text-xl font-semibold text-foreground flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <FlameKindling className="w-5 h-5 text-primary-foreground" />
            </div>
            Wildfire VQA
          </button>
        )}
        <Button
          variant="ghost"
          size="icon"
          className={`h-8 w-8 flex-shrink-0 ${isCollapsed ? 'mx-auto' : ''}`}
          onClick={() => setIsCollapsed(!isCollapsed)}
          title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? (
            <PanelLeft className="h-4 w-4" />
          ) : (
            <PanelLeftClose className="h-4 w-4" />
          )}
        </Button>
      </div>

      {!isCollapsed && <NavigationTabs />}

      <div className="flex-1 overflow-y-auto">
        {isCollapsed && isChat && chatHistories.length > 0 && (
          <div className="px-2 space-y-1">
            {chatHistories.map((chat) => (
              <Button
                key={chat.id}
                variant="ghost"
                size="icon"
                className={`w-full ${
                  activeChatId === chat.id ? "bg-[#C7D4FD]" : ""
                }`}
                onClick={() => onChatSelect?.(chat.id)}
                title={chat.title}
              >
                <MessageSquare className="h-4 w-4" />
              </Button>
            ))}
          </div>
        )}

        {!isCollapsed && isChat && (
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

            <div className="px-3 py-2">
              <ChatHistoryList
                chatHistories={chatHistories}
                activeChatId={activeChatId}
                onChatSelect={onChatSelect || (() => {})}
                onRenameChat={onRenameChat}
                onDeleteChat={onDeleteChat}
              />
            </div>
          </>
        )}

        {!isCollapsed && showAnalyticsMetrics && (
          <div className="p-3 space-y-3">
            <AnalyticsCard
              title="Total Incidents"
              value="293"
              trendText="+12% from 2020-2024"
              showTrend={true}
            />
            <AnalyticsCard
              title="Acres Burned"
              value="40.1M"
              subtitle="Total area affected"
            />
            <AnalyticsCard
              title="Avg Severity"
              value="6.2/10"
              subtitle="Fire intensity index"
            />
          </div>
        )}
      </div>

      {isCollapsed && isChat && (
        <div className="border-t border-border p-2">
          <Button
            variant="ghost"
            size="icon"
            className="w-full bg-[#1E40AF] hover:bg-[#1E40AF]/90 text-white"
            onClick={onNewChat}
            title="New Chat"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      )}

      {!isCollapsed && (
        <div className="border-t border-border">
          <div className="p-3">
            <Button
              variant="outline"
              size="sm"
              className="w-full text-destructive border-destructive/30 hover:bg-destructive/10 hover:text-destructive"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
          <div className="px-4 pb-4 text-xs text-muted-foreground">
            <div>WildFire Reasoning System</div>
            <div>© 2025 WildFire Reasoning System. All rights reserved.</div>
          </div>
        </div>
      )}

      {isCollapsed && (
        <div className="border-t border-border p-3">
          <Button
            variant="ghost"
            size="icon"
            className="w-full text-destructive hover:bg-destructive/10 hover:text-destructive"
            onClick={handleLogout}
            title="Logout"
          >
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
