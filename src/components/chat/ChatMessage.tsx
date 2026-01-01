import React from "react";
import { ChatMessage as ChatMessageType } from "@/lib/globalState";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface ChatMessageProps {
  message: ChatMessageType;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  return (
    <div
      className={`flex ${
        message.role === "user" ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`rounded-lg p-4 text-medium break-words whitespace-normal overflow-wrap-break-word ${
          message.role === "user"
            ? "bg-[#A7BAF7] text-black ml-auto rounded-br-none max-w-[60%]"
            : "bg-[#F3F4F6] text-black rounded-bl-none w-full"
        }`}
        style={{
          overflowWrap: "break-word",
          wordWrap: "break-word",
          hyphens: "auto",
        }}
      >
        {message.attachments && message.attachments.length > 0 && (
          <div
            className={`mb-2 grid ${
              message.attachments.length > 1
                ? "grid-cols-2"
                : "grid-cols-1"
            } gap-2 max-w-[300px]`}
          >
            {message.attachments.map((attachment, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-md overflow-hidden"
              >
                {attachment.type === "image" && (
                  <img
                    src={attachment.url}
                    alt={attachment.name || "Image attachment"}
                    className="w-full max-h-[200px] object-contain rounded-md"
                    style={{ maxWidth: "100%", height: "auto" }}
                    onError={(e) => {
                      console.error(
                        "Image failed to load:",
                        attachment.url
                      );
                      e.currentTarget.src = "/placeholder.svg";
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        )}
        <div className="text-lg">
          {message.role === "user" ? (
            message.content
          ) : (
            <div>
              <Markdown remarkPlugins={[remarkGfm]}>
                {message.content}
              </Markdown>
            </div>
          )}
        </div>
        <div className="text-xs mt-1 opacity-70">
          {new Date(message.timestamp).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
