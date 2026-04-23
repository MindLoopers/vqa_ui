import { useState, useRef, useEffect } from "react";
import { globalState, ChatMessage, ChatHistory } from "@/lib/globalState";
import { sendMultimodalQuery, getChats, getChatMessages } from "@/lib/api";

interface Attachment {
  type: "image";
  file: File;
  previewUrl: string;
}

export const useChat = () => {
  const [chatHistories, setChatHistories] = useState<ChatHistory[]>(
    globalState.getChatHistories()
  );
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [loadingChats, setLoadingChats] = useState<Set<string>>(new Set());
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load chats on initial mount
  useEffect(() => {
    const loadChats = async () => {
      try {
        const backendChats = await getChats();
        const formattedChats: ChatHistory[] = backendChats.map((c) => ({
          id: c.id,
          title: c.title,
          date: new Date(c.created_at).toLocaleDateString(),
          messages: [], // Initially empty, load on demand
        }));
        
        // Merge with any existing local un-synced chats if needed, or just replace
        globalState.setChatHistories(formattedChats);
        setChatHistories(formattedChats);
        
        if (formattedChats.length > 0 && !activeChatId) {
          handleChatSelect(formattedChats[0].id);
        } else if (formattedChats.length === 0 && !activeChatId) {
          handleNewChat();
        }
      } catch (error) {
        console.error("Failed to load chats:", error);
      }
    };
    
    // Only load if authenticated
    if (localStorage.getItem("isAuthenticated") === "true") {
      loadChats();
    }
  }, []);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    if (chatContainerRef.current && activeChatId) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatHistories, activeChatId]);

  // Cleanup function for object URLs when component unmounts
  useEffect(() => {
    return () => {
      attachments.forEach((attachment) => {
        URL.revokeObjectURL(attachment.previewUrl);
      });
    };
  }, [attachments]);

  const handleNewChat = () => {
    const existingEmptyChat = chatHistories.find(
      (chat) => chat.messages.length === 0
    );

    if (existingEmptyChat) {
      setActiveChatId(existingEmptyChat.id);
      globalState.setActiveChatId(existingEmptyChat.id);
    } else {
      const newChat = {
        id: Date.now().toString(), // local ID until synced
        title: "New chat",
        date: new Date().toLocaleDateString(),
        messages: [],
      };
      globalState.addChatHistory(newChat);
      setChatHistories([...globalState.getChatHistories()]);
      setActiveChatId(newChat.id);
      globalState.setActiveChatId(newChat.id);
    }
  };

  const loadMessagesForChat = async (chatId: string) => {
    // Only fetch if it's a valid backend MongoID (24 chars)
    if (!/^[0-9a-fA-F]{24}$/.test(chatId)) return;

    const chat = globalState.getChatById(chatId);
    if (chat && chat.messages.length === 0) {
      setLoadingChats(prev => new Set(prev).add(chatId));
      try {
        const backendMessages = await getChatMessages(chatId);
        const formattedMessages: ChatMessage[] = [];
        
        backendMessages.forEach((msg) => {
          // Add user prompt
          if (msg.prompt) {
            formattedMessages.push({
              id: `${msg.id}-user`,
              role: "user",
              content: msg.prompt,
              timestamp: new Date(msg.created_at),
              attachments: msg.attachments?.map((a) => ({
                type: a.type as any || "image",
                url: a.url || "",
                name: a.name || "",
              })) || [],
            });
          }
          
          // Add assistant response
          if (msg.response) {
            formattedMessages.push({
              id: `${msg.id}-assistant`,
              role: "assistant",
              content: msg.response,
              timestamp: new Date(msg.created_at),
            });
          }
        });
        
        chat.messages = formattedMessages;
        setChatHistories([...globalState.getChatHistories()]);
      } catch (error) {
        console.error(`Failed to load messages for chat ${chatId}:`, error);
      } finally {
        setLoadingChats(prev => {
          const newSet = new Set(prev);
          newSet.delete(chatId);
          return newSet;
        });
      }
    }
  };

  const handleChatSelect = (id: string) => {
    setActiveChatId(id);
    globalState.setActiveChatId(id);
    loadMessagesForChat(id);
  };

  const handleRenameChat = (id: string, newTitle: string) => {
    globalState.renameChatHistory(id, newTitle);
    setChatHistories([...globalState.getChatHistories()]);
  };

  const handleDeleteChat = (id: string) => {
    globalState.deleteChatHistory(id);
    setChatHistories([...globalState.getChatHistories()]);
    
    // If the deleted chat was active, clear the active chat
    if (activeChatId === id) {
      setActiveChatId(null);
      globalState.setActiveChatId(null);
    }
  };

  const handleAttachFile = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    if (attachments.length + files.length > 5) {
      alert("Maximum 5 images allowed");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      return;
    }

    const newAttachments = [...attachments];

    Array.from(files).forEach((file) => {
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

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const clearAttachments = () => {
    setAttachments([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeAttachment = (index: number) => {
    const newAttachments = [...attachments];
    URL.revokeObjectURL(newAttachments[index].previewUrl);
    newAttachments.splice(index, 1);
    setAttachments(newAttachments);
  };

  const handleVoiceTranscript = (transcript: string) => {
    if (message.trim()) {
      setMessage(message + " " + transcript);
    } else {
      setMessage(transcript);
    }
  };

  const handleSendMessage = async () => {
    if ((!message.trim() && attachments.length === 0) || !activeChatId) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: message,
      timestamp: new Date(),
      attachments: attachments.map((attachment) => {
        const persistentUrl = attachment.previewUrl;
        return {
          type: attachment.type,
          url: persistentUrl,
          name: attachment.file.name,
        };
      }),
    };

    const currentChat = globalState.getChatById(activeChatId);
    if (currentChat) {
      currentChat.messages.push(userMessage);

      if (currentChat.messages.length === 1 && message.trim()) {
        const firstWords = message.trim().split(" ").slice(0, 5).join(" ");
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

      setLoadingChats(prev => {
        const newSet = new Set(prev);
        newSet.add(activeChatId);
        return newSet;
      });

      try {
        const response = await sendMultimodalQuery(message, imageFiles, activeChatId);

        const assistantMessage: ChatMessage = {
          id: response.request_id || (Date.now() + 1).toString(),
          role: "assistant",
          content: response.response || "No response content",
          timestamp: new Date(),
        };

        currentChat.messages.push(assistantMessage);
        
        // If it was a new chat, the backend created it and returned an ID.
        // We'd ideally need to update our frontend ID to match the backend ID.
        // However, we handle this transparently using chatMap in api.ts for now.
        
        setChatHistories([...globalState.getChatHistories()]);
      } catch (error) {
        console.error("API Error:", error);
        const errorMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "API failed. Please try again later.",
          timestamp: new Date(),
        };

        currentChat.messages.push(errorMessage);
        setChatHistories([...globalState.getChatHistories()]);
      } finally {
        setLoadingChats(prev => {
          const newSet = new Set(prev);
          newSet.delete(activeChatId);
          return newSet;
        });

        setTimeout(() => {
          if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop =
              chatContainerRef.current.scrollHeight;
          }
        }, 300);
      }
    }
  };

  return {
    // State
    chatHistories,
    activeChatId,
    message,
    loadingChats,
    attachments,
    chatContainerRef,
    fileInputRef,
    // Setters
    setMessage,
    // Handlers
    handleNewChat,
    handleChatSelect,
    handleRenameChat,
    handleDeleteChat,
    handleAttachFile,
    handleFileChange,
    clearAttachments,
    removeAttachment,
    handleVoiceTranscript,
    handleSendMessage,
  };
};
