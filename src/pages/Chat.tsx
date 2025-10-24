import React, { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { FlameKindling, Paperclip, Send, X } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import { globalState, ChatMessage } from "@/lib/globalState";
import { sendMultimodalQuery } from "@/lib/api";

const Chat = () => {
  const [chatHistories, setChatHistories] = useState(
    globalState.getChatHistories()
  );
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [attachments, setAttachments] = useState<
    {
      type: "image";
      file: File;
      previewUrl: string;
    }[]
  >([]);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    if (chatContainerRef.current && activeChatId) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistories, activeChatId]);

  // Cleanup function for object URLs when component unmounts
  useEffect(() => {
    return () => {
      // Cleanup any object URLs when component unmounts
      attachments.forEach((attachment) => {
        URL.revokeObjectURL(attachment.previewUrl);
      });
    };
  }, [attachments]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleNewChat = () => {
    // Check if we already have an empty chat
    const existingEmptyChat = chatHistories.find(
      (chat) => chat.messages.length === 0
    );

    if (existingEmptyChat) {
      // If an empty chat exists, just activate it instead of creating a new one
      setActiveChatId(existingEmptyChat.id);
      globalState.setActiveChatId(existingEmptyChat.id);
    } else {
      // Otherwise create a new chat
      const newChat = {
        id: Date.now().toString(),
        title: "New chat",
        date: new Date().toLocaleDateString(),
        messages: [],
      };
      globalState.addChatHistory(newChat);
      setChatHistories(globalState.getChatHistories());
      setActiveChatId(newChat.id);
    }
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
    const files = e.target.files;
    if (!files || files.length === 0) return;

    // Check if adding these files would exceed the limit of 5
    if (attachments.length + files.length > 5) {
      alert("Maximum 5 images allowed");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      return;
    }

    // Process each file
    const newAttachments = [...attachments];

    Array.from(files).forEach((file) => {
      // Check if file is an image
      const isImage = file.type.startsWith("image/");

      if (!isImage) {
        alert("Only image files are allowed");
        return;
      }

      const previewUrl = URL.createObjectURL(file);
      newAttachments.push({
        type: "image",
        file,
        previewUrl,
      });
    });

    setAttachments(newAttachments);

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const clearAttachments = () => {
    // Don't revoke URLs as they're needed for display in the chat
    // We'll handle cleanup when the component unmounts instead

    setAttachments([]);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeAttachment = (index: number) => {
    const newAttachments = [...attachments];

    // Revoke the object URL to prevent memory leaks
    URL.revokeObjectURL(newAttachments[index].previewUrl);

    // Remove the attachment
    newAttachments.splice(index, 1);
    setAttachments(newAttachments);
  };

  const handleSendMessage = async () => {
    if ((!message.trim() && attachments.length === 0) || !activeChatId) return;

    // Create user message with proper image URLs
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: message,
      timestamp: new Date(),
      attachments: attachments.map((attachment) => {
        // Create a persistent copy of the image URL
        const persistentUrl = attachment.previewUrl;
        console.log("Adding attachment with URL:", persistentUrl);
        return {
          type: attachment.type,
          url: persistentUrl,
          name: attachment.file.name,
        };
      }),
    };

    // Add user message to chat
    const currentChat = globalState.getChatById(activeChatId);
    if (currentChat) {
      currentChat.messages.push(userMessage);

      // Update chat title with first few words if this is the first message
      if (currentChat.messages.length === 1 && message.trim()) {
        // Split by spaces and get first 5 words
        const firstWords = message.trim().split(" ").slice(0, 5).join(" ");

        // Ensure title isn't too long (max 25 characters)
        let truncatedTitle = firstWords;
        if (truncatedTitle.length > 50) {
          truncatedTitle = truncatedTitle.substring(0, 22) + "...";
        } else if (firstWords.length < message.trim().length) {
          truncatedTitle = `${firstWords}...`;
        }

        currentChat.title = truncatedTitle;
      }

      setMessage("");
      const imageFiles = attachments.map((a) => a.file);
      clearAttachments();
      setChatHistories([...globalState.getChatHistories()]);

      // Call the API
      setLoading(true);
      try {
        // Call the multimodal API
        const response = await sendMultimodalQuery(message, imageFiles);

        // Create assistant response
        const assistantMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: response.response || "No response content",
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
        // Scroll to bottom after message is sent with a longer delay to ensure content is rendered
        setTimeout(() => {
          if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop =
              chatContainerRef.current.scrollHeight;
          }
        }, 300);
      }
    }
  };

  return (
    <div className="flex h-screen bg-white overflow-x-hidden">
      <Sidebar
        chatHistories={chatHistories}
        activeChatId={activeChatId}
        onChatSelect={handleChatSelect}
        onNewChat={handleNewChat}
      />

      <div className="flex-1 flex flex-col items-center justify-center py-4">
        {!activeChatId ? (
          <div className="text-center max-w-2xl">
            <div className="mb-6 flex justify-center">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                <FlameKindling className="w-10 h-10 text-primary" />
              </div>
            </div>
            <h2 className="text-3xl font-bold mb-4 text-foreground">
              Welcome to WildFire Reasoning System
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
          <div className="w-full flex flex-col h-full">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h2 className="text-lg font-semibold text-foreground pl-40">
                {chatHistories.find((c) => c.id === activeChatId)?.title}
              </h2>
            </div>
            <div
              className="flex-1 overflow-y-auto px-40 py-6"
              ref={chatContainerRef}
            >
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
                        className={`max-w-[80%] rounded-lg p-4 text-medium break-words whitespace-normal overflow-wrap-break-word ${
                          msg.role === "user"
                            ? "bg-[#A7BAF7] text-black ml-auto rounded-br-none"
                            : "bg-[#F3F4F6] text-black rounded-bl-none"
                        }`}
                        style={{
                          overflowWrap: "break-word",
                          wordWrap: "break-word",
                          hyphens: "auto",
                        }}
                      >
                        {msg.attachments && msg.attachments.length > 0 && (
                          <div
                            className={`mb-2 grid ${
                              msg.attachments.length > 1
                                ? "grid-cols-2"
                                : "grid-cols-1"
                            } gap-2 max-w-[300px]`}
                          >
                            {msg.attachments.map((attachment, index) => (
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
                      <div className="flex items-center space-x-3">
                        <div className="relative w-10 h-10">
                          <div className="absolute inset-0 rounded-full border-t-2 border-r-2 border-primary animate-spin"></div>
                          <div className="absolute inset-1 rounded-full border-b-2 border-l-2 border-accent animate-spin animation-delay-500"></div>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></div>
                          </div>
                        </div>
                        <div className="text-sm text-foreground/70 font-medium">
                          Processing your request...
                        </div>
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
              accept="image/jpeg,image/png,image/gif,image/webp"
              onChange={handleFileChange}
              multiple
            />
            {/* Attachments preview */}
            {attachments.length > 0 && (
              <div className="border-t border-border p-2 bg-muted">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">
                    Attached Images ({attachments.length}/5)
                  </span>
                  <Button variant="ghost" size="sm" onClick={clearAttachments}>
                    Clear All
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {attachments.map((attachment, index) => (
                    <div key={index} className="relative">
                      <img
                        src={attachment.previewUrl}
                        alt={`Preview ${index + 1}`}
                        className="h-16 w-16 object-cover rounded"
                      />
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0"
                        onClick={() => removeAttachment(index)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="border-t border-border py-6 px-40 bg-card">
              <div className="relative flex items-center">
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-2 h-10 w-10 z-10"
                  onClick={handleAttachFile}
                >
                  <Paperclip className="w-6 h-6" />
                </Button>
                <textarea
                  placeholder="Ask about wildfire analysis..."
                  className="flex-1 pl-14 pr-14 h-14 text-lg w-full resize-none border rounded-md py-4 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent "
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  style={{
                    minHeight: "64px",
                    maxHeight: "120px",
                    overflow: "hidden",
                  }}
                />
                <Button
                  size="icon"
                  className="absolute right-2 bg-primary hover:bg-primary/90 h-10 w-10"
                  onClick={handleSendMessage}
                  disabled={
                    loading || (!message.trim() && attachments.length === 0)
                  }
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
