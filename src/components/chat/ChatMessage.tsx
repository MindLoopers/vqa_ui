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
  const imageAttachments = (message.attachments ?? []).filter(
    (a) => a.type === "image" && a.url
  );
  const hasImages = imageAttachments.length > 0;

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
          isUser
            ? `items-end ${hasImages ? "max-w-[85%]" : "max-w-[70%]"}`
            : "items-start max-w-[80%]"
        }`}
      >
        <div
          className={`rounded-2xl break-words overflow-hidden ${
            isUser
              ? "bg-[#A7BAF7] text-gray-900 rounded-tr-sm shadow-sm"
              : "bg-white border border-[#E2E8F0] text-gray-800 rounded-tl-sm shadow-sm"
          }`}
          style={{ overflowWrap: "break-word", wordBreak: "break-word" }}
        >
          {/* Images — flush at the top, full bubble width */}
          {hasImages && (
            <div
              className={`overflow-hidden ${
                isUser ? "rounded-t-2xl rounded-tr-sm" : "rounded-t-2xl rounded-tl-sm"
              } ${message.content ? "mb-0" : ""}`}
            >
              {imageAttachments.length === 1 ? (
                <img
                  src={imageAttachments[0].url}
                  alt={imageAttachments[0].name || "Attached image"}
                  className="w-full max-h-80 object-cover block"
                />
              ) : (
                <div
                  className={`grid gap-0.5 ${
                    imageAttachments.length === 2
                      ? "grid-cols-2"
                      : imageAttachments.length === 3
                      ? "grid-cols-3"
                      : "grid-cols-2"
                  }`}
                >
                  {imageAttachments.map((att, i) => (
                    <img
                      key={i}
                      src={att.url}
                      alt={att.name || `Image ${i + 1}`}
                      className="w-full h-44 object-cover block"
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Text content */}
          {message.content && (
            <div className="px-4 py-3">
              {isUser ? (
                <span className="text-base leading-relaxed">{message.content}</span>
              ) : (
                <div className="prose prose-sm max-w-none prose-gray prose-headings:text-gray-800 prose-p:text-gray-800 prose-li:text-gray-800 prose-strong:text-gray-900 prose-code:text-gray-800 prose-p:my-1 prose-headings:mt-3 prose-headings:mb-1 prose-ul:my-1 prose-ol:my-1 prose-li:my-0 text-base leading-relaxed">
                  <Markdown remarkPlugins={[remarkGfm]}>{message.content}</Markdown>
                </div>
              )}
            </div>
          )}
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
