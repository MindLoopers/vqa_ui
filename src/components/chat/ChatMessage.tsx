import React, { useState } from "react";
import { ChatMessage as ChatMessageType } from "@/lib/globalState";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Copy, Check, User, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChatMessageProps {
  message: ChatMessageType;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text:", err);
    }
  };

  const isUser = message.role === "user";

  return (
    <div className={`flex gap-3 ${isUser ? "flex-row-reverse" : "flex-row"}`}>
      {/* Avatar */}
      <div className="flex-shrink-0 mt-1">
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center shadow-sm ${
            isUser ? "bg-[#1E40AF]" : "bg-[#475569]"
          }`}
        >
          {isUser ? (
            <User className="w-4 h-4 text-white" />
          ) : (
            <Bot className="w-4 h-4 text-white" />
          )}
        </div>
      </div>

      {/* Message bubble + footer */}
      <div
        className={`flex flex-col gap-1 ${
          isUser ? "items-end max-w-[70%]" : "items-start max-w-[80%]"
        }`}
      >
        <div
          className={`rounded-2xl px-4 py-3 break-words ${
            isUser
              ? "bg-[#A7BAF7] text-gray-900 rounded-tr-sm shadow-sm"
              : "bg-white border border-[#E2E8F0] text-gray-800 rounded-tl-sm shadow-sm"
          }`}
          style={{ overflowWrap: "break-word", wordBreak: "break-word" }}
        >
          {message.attachments && message.attachments.length > 0 && (
            <div
              className={`mb-3 grid gap-2 ${
                message.attachments.length > 1 ? "grid-cols-2" : "grid-cols-1"
              }`}
              style={{ maxWidth: "280px" }}
            >
              {message.attachments.map((attachment, index) => (
                <div
                  key={index}
                  className="rounded-xl overflow-hidden border border-white/30"
                >
                  {attachment.type === "image" && (
                    <img
                      src={attachment.url}
                      alt={attachment.name || "Image attachment"}
                      className="w-full max-h-[200px] object-cover"
                      onError={(e) => {
                        e.currentTarget.src = "/placeholder.svg";
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
          )}

          <div className="text-base leading-relaxed">
            {isUser ? (
              <span>{message.content}</span>
            ) : (
              <Markdown remarkPlugins={[remarkGfm]}>{message.content}</Markdown>
            )}
          </div>
        </div>

        {/* Timestamp + copy */}
        <div
          className={`flex items-center gap-1.5 px-1 ${
            isUser ? "flex-row-reverse" : "flex-row"
          }`}
        >
          <span className="text-xs text-gray-400">
            {new Date(message.timestamp).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
          <Button
            variant="ghost"
            size="icon"
            className="h-5 w-5 opacity-40 hover:opacity-90 rounded transition-opacity"
            onClick={handleCopy}
            title="Copy message"
          >
            {copied ? (
              <Check className="h-3 w-3 text-green-600" />
            ) : (
              <Copy className="h-3 w-3 text-gray-500" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
