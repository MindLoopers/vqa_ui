import React from "react";
import Sidebar from "@/components/Sidebar";
import ChatMessage from "@/components/chat/ChatMessage";
import LoadingIndicator from "@/components/chat/LoadingIndicator";
import AttachmentsPreview from "@/components/chat/AttachmentsPreview";
import ChatInput from "@/components/chat/ChatInput";
import CenteredChatInput from "@/components/chat/CenteredChatInput";
import EmptyState from "@/components/chat/EmptyState";
import { useChat } from "@/hooks/useChat";

const Chat = () => {
  const {
    chatHistories,
    activeChatId,
    message,
    loadingChats,
    attachments,
    chatContainerRef,
    fileInputRef,
    setMessage,
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
  } = useChat();

  return (
    <div className="flex h-screen bg-white overflow-x-hidden">
      <Sidebar
        chatHistories={chatHistories}
        activeChatId={activeChatId}
        onChatSelect={handleChatSelect}
        onNewChat={handleNewChat}
        onRenameChat={handleRenameChat}
        onDeleteChat={handleDeleteChat}
      />

      <div className="flex-1 flex flex-col items-center justify-center pt-4">
        {!activeChatId ? (
          <EmptyState onNewChat={handleNewChat} />
        ) : chatHistories.find((c) => c.id === activeChatId)?.messages.length === 0 ? (
          /* Show centered input for new chats with no messages */
          <>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/jpeg,image/png,image/gif,image/webp"
              onChange={handleFileChange}
              multiple
            />
            
            {attachments.length > 0 && (
              <div className="absolute top-20 left-1/2 transform -translate-x-1/2 z-10">
                <AttachmentsPreview
                  attachments={attachments}
                  onClearAll={clearAttachments}
                  onRemove={removeAttachment}
                />
              </div>
            )}
            
            <CenteredChatInput
              message={message}
              onMessageChange={setMessage}
              onSend={handleSendMessage}
              onAttachFile={handleAttachFile}
              onVoiceTranscript={handleVoiceTranscript}
              disabled={activeChatId ? loadingChats.has(activeChatId) : false}
              hasAttachments={attachments.length > 0}
            />
          </>
        ) : (
          /* Regular layout for chats with messages */
          <div className="w-full flex flex-col h-full">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h2 className="text-lg font-semibold text-foreground pl-40">
                {chatHistories.find((c) => c.id === activeChatId)?.title}
              </h2>
            </div>

            <div
              className="flex-1 overflow-y-auto"
              ref={chatContainerRef}
              style={{
                paddingLeft: "10rem",
                paddingRight: "10rem",
                paddingTop: "1.5rem",
                paddingBottom: "1.5rem",
              }}
            >
              <div className="space-y-4">
                {chatHistories
                  .find((c) => c.id === activeChatId)
                  ?.messages.map((msg) => (
                    <ChatMessage key={msg.id} message={msg} />
                  ))}
                {activeChatId && loadingChats.has(activeChatId) && (
                  <LoadingIndicator />
                )}
              </div>
            </div>

            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/jpeg,image/png,image/gif,image/webp"
              onChange={handleFileChange}
              multiple
            />

            <AttachmentsPreview
              attachments={attachments}
              onClearAll={clearAttachments}
              onRemove={removeAttachment}
            />

            <ChatInput
              message={message}
              onMessageChange={setMessage}
              onSend={handleSendMessage}
              onAttachFile={handleAttachFile}
              onVoiceTranscript={handleVoiceTranscript}
              disabled={activeChatId ? loadingChats.has(activeChatId) : false}
              hasAttachments={attachments.length > 0}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
