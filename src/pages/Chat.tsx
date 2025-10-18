import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FlameKindling, Paperclip, Send } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import { globalState, ChatMessage } from "@/lib/globalState";

const Chat = () => {
  const [chatHistories, setChatHistories] = useState(
    globalState.getChatHistories()
  );
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [attachment, setAttachment] = useState<{
    type: "image" | "video";
    file: File;
    previewUrl: string;
  } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleNewChat = () => {
    const newChat = {
      id: Date.now().toString(),
      title: "New chat",
      date: new Date().toLocaleDateString(),
      messages: [],
    };
    globalState.addChatHistory(newChat);
    setChatHistories(globalState.getChatHistories());
    setActiveChatId(newChat.id);
  };

  const handleChatSelect = (id: string) => {
    setActiveChatId(id);
    globalState.setActiveChatId(id);
  };

  const handleAttachFile = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check if file is an image or video
    const isImage = file.type.startsWith("image/");
    const isVideo = file.type.startsWith("video/");

    if (!isImage && !isVideo) {
      alert("Only image and video files are allowed");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      return;
    }

    const fileType = isImage ? "image" : "video";
    const previewUrl = URL.createObjectURL(file);
    setAttachment({
      type: fileType,
      file,
      previewUrl,
    });
  };

  const clearAttachment = () => {
    if (attachment?.previewUrl) {
      URL.revokeObjectURL(attachment.previewUrl);
    }
    setAttachment(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSendMessage = async () => {
    if ((!message.trim() && !attachment) || !activeChatId) return;

    // Create user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: message,
      timestamp: new Date(),
    };

    // Add attachment if exists
    if (attachment) {
      userMessage.attachment = {
        type: attachment.type,
        url: attachment.previewUrl,
        name: attachment.file.name,
      };
    }

    // Add user message to chat
    const currentChat = globalState.getChatById(activeChatId);
    if (currentChat) {
      currentChat.messages.push(userMessage);
      
      // Update chat title with first few words if this is the first message
      if (currentChat.messages.length === 1 && message.trim()) {
        const firstWords = message.trim().split(' ').slice(0, 5).join(' ');
        const truncatedTitle = firstWords.length < message.trim().length ? `${firstWords}...` : firstWords;
        currentChat.title = truncatedTitle;
      }
      
      setMessage("");
      clearAttachment();
      setChatHistories([...globalState.getChatHistories()]);

      // Mock API call
      setLoading(true);
      try {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Randomly decide if API fails (20% chance)
        if (Math.random() > 0.8) {
          throw new Error("API failed");
        }

        // Create assistant response
        const assistantMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: `Based on the image analysis, this appears to be a high-severity wildfire with extensive smoke coverage and visible flames. The fire intensity suggests active burning with significant heat output.`,
          timestamp: new Date(),
        };

        currentChat.messages.push(assistantMessage);
        setChatHistories([...globalState.getChatHistories()]);
      } catch (error) {
        // Create error message from assistant
        const errorMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "API failed. Please try again later.",
          timestamp: new Date(),
        };

        currentChat.messages.push(errorMessage);
        setChatHistories([...globalState.getChatHistories()]);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar
        chatHistories={chatHistories}
        activeChatId={activeChatId}
        onChatSelect={handleChatSelect}
        onNewChat={handleNewChat}
      />

      <div className="flex-1 flex flex-col items-center justify-center p-8">
        {!activeChatId ? (
          <div className="text-center max-w-2xl">
            <div className="mb-6 flex justify-center">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                <FlameKindling className="w-10 h-10 text-primary" />
              </div>
            </div>
            <h2 className="text-3xl font-bold mb-4 text-foreground">
              Welcome to Wildfire VQA
            </h2>
            <p className="text-muted-foreground mb-8 text-lg">
              Advanced Visual Question Answering system for wildfire monitoring,
              analysis, and prediction. Upload images or CSV data to begin your
              analysis.
            </p>
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90"
              onClick={handleNewChat}
            >
              Start New Chat
            </Button>
          </div>
        ) : (
          <div className="w-full max-w-4xl flex flex-col h-full">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h2 className="text-lg font-semibold text-foreground">
                {chatHistories.find((c) => c.id === activeChatId)?.title}
              </h2>
            </div>
            <div className="flex-1 overflow-y-auto px-0 py-6">
              <div className="space-y-4">
                {chatHistories
                  .find((c) => c.id === activeChatId)
                  ?.messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${
                        msg.role === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg p-4 ${
                          msg.role === "user"
                            ? "bg-primary text-primary-foreground ml-auto rounded-br-none"
                            : "bg-muted rounded-bl-none"
                        }`}
                      >
                        {msg.attachment && msg.attachment.type === "image" && (
                          <div className="mb-2">
                            <img
                              src={msg.attachment.url}
                              alt={msg.attachment.name}
                              className="max-w-full rounded-md"
                            />
                          </div>
                        )}
                        {msg.attachment && msg.attachment.type === "video" && (
                          <div className="mb-2">
                            <video
                              src={msg.attachment.url}
                              controls
                              className="max-w-full rounded-md"
                            />
                          </div>
                        )}
                        {msg.content}
                        <div className="text-xs mt-1 opacity-70">
                          {new Date(msg.timestamp).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>
                      </div>
                    </div>
                  ))}
                {loading && (
                  <div className="flex justify-start">
                    <div className="max-w-[80%] rounded-lg p-4 bg-muted rounded-bl-none">
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 rounded-full bg-foreground/30 animate-bounce"></div>
                        <div className="w-2 h-2 rounded-full bg-foreground/30 animate-bounce delay-75"></div>
                        <div className="w-2 h-2 rounded-full bg-foreground/30 animate-bounce delay-150"></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            {/* Hidden file input */}
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/jpeg,image/png,image/gif,image/webp,video/mp4,video/webm"
              onChange={handleFileChange}
            />
            {/* Attachment preview */}
            {attachment && (
              <div className="border-t border-border p-2 bg-muted">
                <div className="flex items-center gap-2">
                  <div className="flex-1 flex items-center gap-2">
                    {attachment.type === "image" ? (
                      <img
                        src={attachment.previewUrl}
                        alt="Preview"
                        className="h-10 w-10 object-cover rounded"
                      />
                    ) : (
                      <video
                        src={attachment.previewUrl}
                        className="h-10 w-10 object-cover rounded"
                      />
                    )}
                    <span className="text-sm truncate">
                      {attachment.file.name}
                    </span>
                  </div>
                  <Button variant="ghost" size="sm" onClick={clearAttachment}>
                    ×
                  </Button>
                </div>
              </div>
            )}
            <div className="border-t border-border p-4 bg-card">
              <div className="relative flex items-center">
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-2 h-8 w-8 z-10"
                  onClick={handleAttachFile}
                >
                  <Paperclip className="w-4 h-4" />
                </Button>
                <Input
                  type="text"
                  placeholder="Ask about wildfire analysis..."
                  className="flex-1 pl-12 pr-12"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />
                <Button
                  size="icon"
                  className="absolute right-2 bg-primary hover:bg-primary/90 h-8 w-8"
                  onClick={handleSendMessage}
                  disabled={loading || (!message.trim() && !attachment)}
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
