import React, { useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Paperclip, Send } from "lucide-react";
import VoiceInput from "@/components/VoiceInput";

interface ChatInputProps {
  message: string;
  onMessageChange: (message: string) => void;
  onSend: () => void;
  onAttachFile: () => void;
  onVoiceTranscript: (transcript: string) => void;
  disabled: boolean;
  hasAttachments: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({
  message,
  onMessageChange,
  onSend,
  onAttachFile,
  onVoiceTranscript,
  disabled,
  hasAttachments,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "56px";
      const scrollHeight = textareaRef.current.scrollHeight;
      const maxHeight = 200;
      textareaRef.current.style.height = `${Math.min(scrollHeight, maxHeight)}px`;
      textareaRef.current.style.overflow = scrollHeight > maxHeight ? "auto" : "hidden";
    }
  }, [message]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!disabled && (message.trim() || hasAttachments)) {
        onSend();
      }
    }
  };

  return (
    <div className="border-t border-border bg-card py-4">
      <div className="max-w-4xl mx-auto px-6">
        <div className="relative flex items-end bg-background border border-border rounded-2xl shadow-sm transition-all focus-within:border-primary/50 focus-within:shadow-md focus-within:shadow-primary/10">
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-2 bottom-2 h-10 w-10 z-10 text-muted-foreground hover:text-foreground"
            onClick={onAttachFile}
            title="Attach image"
          >
            <Paperclip className="w-5 h-5" />
          </Button>
          <textarea
            ref={textareaRef}
            placeholder="Ask about wildfire analysis..."
            className="flex-1 pl-14 pr-28 text-base w-full resize-none bg-transparent py-3.5 focus:outline-none text-foreground placeholder:text-muted-foreground"
            value={message}
            onChange={(e) => onMessageChange(e.target.value)}
            onKeyDown={handleKeyDown}
            style={{ minHeight: "56px", height: "56px" }}
          />
          <div className="absolute right-14 bottom-2 h-10 w-10">
            <VoiceInput onTranscript={onVoiceTranscript} disabled={disabled} />
          </div>
          <Button
            size="icon"
            className="absolute right-2 bottom-2 bg-primary hover:bg-primary/90 h-10 w-10 rounded-xl shadow-sm transition-all"
            onClick={onSend}
            disabled={disabled || (!message.trim() && !hasAttachments)}
            title="Send message"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground text-center mt-2">
          Press <kbd className="px-1 py-0.5 rounded bg-muted text-muted-foreground font-mono text-xs">Enter</kbd> to send &middot; <kbd className="px-1 py-0.5 rounded bg-muted text-muted-foreground font-mono text-xs">Shift+Enter</kbd> for new line
        </p>
      </div>
    </div>
  );
};

export default ChatInput;
