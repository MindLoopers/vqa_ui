import React from "react";
import { MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatHistoryItem {
  id: string;
  title: string;
  date: string;
}

interface ChatHistoryListProps {
  chatHistories: ChatHistoryItem[];
  activeChatId: string | null;
  onChatSelect: (id: string) => void;
}

const ChatHistoryList: React.FC<ChatHistoryListProps> = ({
  chatHistories,
  activeChatId,
  onChatSelect,
}) => {
  if (chatHistories.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-40 text-muted-foreground text-sm">
        <MessageSquare className="w-12 h-12 mb-2 opacity-20" />
        No chat history yet
      </div>
    );
  }

  return (
    <div className="space-y-1">
      {chatHistories.map((chat) => (
        <button
          key={chat.id}
          onClick={() => onChatSelect(chat.id)}
          className={cn(
            "w-full text-left px-3 py-2.5 rounded-md text-sm transition-colors",
            "hover:bg-[#C7D4FD]",
            activeChatId === chat.id && "bg-[#C7D4FD] text-foreground"
          )}
        >
          <div className="font-medium truncate">
            {chat.title.startsWith("New Chat") ? "New chat" : chat.title}
          </div>
          <div className="text-xs text-muted-foreground mt-0.5">
            {chat.date}
          </div>
        </button>
      ))}
    </div>
  );
};

export default ChatHistoryList;
