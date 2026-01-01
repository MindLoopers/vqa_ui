import React, { useState } from "react";
import { MessageSquare, MoreVertical, Pencil, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ChatHistoryItem {
  id: string;
  title: string;
  date: string;
}

interface ChatHistoryListProps {
  chatHistories: ChatHistoryItem[];
  activeChatId: string | null;
  onChatSelect: (id: string) => void;
  onRenameChat?: (id: string, newTitle: string) => void;
  onDeleteChat?: (id: string) => void;
}

const ChatHistoryList: React.FC<ChatHistoryListProps> = ({
  chatHistories,
  activeChatId,
  onChatSelect,
  onRenameChat,
  onDeleteChat,
}) => {
  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState("");

  const handleRename = (chat: ChatHistoryItem) => {
    setRenamingId(chat.id);
    setNewTitle(chat.title);
  };

  const handleRenameSubmit = (id: string) => {
    if (newTitle.trim() && onRenameChat) {
      onRenameChat(id, newTitle.trim());
    }
    setRenamingId(null);
    setNewTitle("");
  };

  const handleRenameCancel = () => {
    setRenamingId(null);
    setNewTitle("");
  };

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
        <div
          key={chat.id}
          className={cn(
            "group relative flex items-center rounded-md transition-colors",
            "hover:bg-[#C7D4FD]",
            activeChatId === chat.id && "bg-[#C7D4FD]"
          )}
        >
          {renamingId === chat.id ? (
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleRenameSubmit(chat.id);
                } else if (e.key === "Escape") {
                  handleRenameCancel();
                }
              }}
              onBlur={() => handleRenameSubmit(chat.id)}
              autoFocus
              className="flex-1 px-3 py-2.5 text-sm bg-transparent border-none outline-none focus:ring-2 focus:ring-primary rounded-md"
            />
          ) : (
            <>
              <button
                onClick={() => onChatSelect(chat.id)}
                className="flex-1 text-left px-3 py-2.5 text-sm"
              >
                <div className="font-medium truncate pr-6">
                  {chat.title.startsWith("New Chat") ? "New chat" : chat.title}
                </div>
                <div className="text-xs text-muted-foreground mt-0.5">
                  {chat.date}
                </div>
              </button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40">
                  <DropdownMenuItem onClick={() => handleRename(chat)}>
                    <Pencil className="mr-2 h-4 w-4" />
                    Rename
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => onDeleteChat?.(chat.id)}
                    className="text-destructive focus:text-destructive"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default ChatHistoryList;
