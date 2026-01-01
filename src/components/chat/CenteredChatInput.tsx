import React, { useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Paperclip, Send } from "lucide-react";
import VoiceInput from "@/components/VoiceInput";

interface CenteredChatInputProps {
  message: string;
  onMessageChange: (message: string) => void;
  onSend: () => void;
  onAttachFile: () => void;
  onVoiceTranscript: (transcript: string) => void;
  disabled: boolean;
  hasAttachments: boolean;
}

const CenteredChatInput: React.FC<CenteredChatInputProps> = ({
  message,
  onMessageChange,
  onSend,
  onAttachFile,
  onVoiceTranscript,
  disabled,
  hasAttachments,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea based on content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "64px";
      const scrollHeight = textareaRef.current.scrollHeight;
      const maxHeight = 200;
      textareaRef.current.style.height = `${Math.min(scrollHeight, maxHeight)}px`;
      textareaRef.current.style.overflow = scrollHeight > maxHeight ? "auto" : "hidden";
    }
  }, [message]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div className="flex items-center justify-center h-full px-8 w-full max-w-6xl">
      <div className="w-full max-w-3xl">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold mb-2 text-foreground">
            What can I help you with?
          </h2>
          <p className="text-muted-foreground">
            Ask questions about wildfire analysis, upload images, or analyze data
          </p>
        </div>
        
        <div className="relative flex items-end bg-card border border-border rounded-lg shadow-lg">
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-2 bottom-2 h-10 w-10 z-10"
            onClick={onAttachFile}
          >
            <Paperclip className="w-6 h-6" />
          </Button>
          <textarea
            ref={textareaRef}
            placeholder="Ask about wildfire analysis..."
            className="flex-1 pl-14 pr-28 h-16 text-lg w-full resize-none bg-transparent py-4 focus:outline-none"
            value={message}
            onChange={(e) => onMessageChange(e.target.value)}
            onKeyDown={handleKeyDown}
            style={{
              minHeight: "64px",
              height: "64px",
            }}
          />
          <div className="absolute right-14 bottom-2 h-10 w-10">
            <VoiceInput
              onTranscript={onVoiceTranscript}
              disabled={disabled}
            />
          </div>
          <Button
            size="icon"
            className="absolute right-2 bottom-2 bg-primary hover:bg-primary/90 h-10 w-10"
            onClick={onSend}
            disabled={disabled || (!message.trim() && !hasAttachments)}
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CenteredChatInput;
