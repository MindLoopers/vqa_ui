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

  const activeChat = chatHistories.find((c) => c.id === activeChatId);

  return (
    <div className="flex h-screen bg-background overflow-x-hidden">
      <Sidebar
        chatHistories={chatHistories}
        activeChatId={activeChatId}
        onChatSelect={handleChatSelect}
        onNewChat={handleNewChat}
        onRenameChat={handleRenameChat}
        onDeleteChat={handleDeleteChat}
      />

      <div className="flex-1 flex flex-col items-center justify-center min-w-0">
        {!activeChatId ? (
          /* No chat selected */
          <EmptyState onNewChat={handleNewChat} />
        ) : activeChat?.messages.length === 0 ? (
          /* New chat — centered input */
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
              <div className="w-full max-w-2xl px-8 mb-4">
                <AttachmentsPreview
                  attachments={attachments}
                  onClearAll={clearAttachments}
                  onRemove={removeAttachment}
                />
              </div>
            )}

            <CenteredChatInput
              key={activeChatId}
              message={message}
              onMessageChange={setMessage}
              onSend={handleSendMessage}
              onAttachFile={handleAttachFile}
              onVoiceTranscript={handleVoiceTranscript}
              disabled={loadingChats.has(activeChatId)}
              hasAttachments={attachments.length > 0}
            />
          </>
        ) : (
          /* Active chat with messages */
          <div className="w-full flex flex-col h-full min-w-0">
            {/* Chat header */}
            <div className="border-b border-border bg-card shrink-0">
              <div className="max-w-4xl mx-auto px-6 py-3">
                <h2 className="text-base font-semibold text-foreground truncate">
                  {activeChat?.title}
                </h2>
              </div>
            </div>

            {/* Messages area */}
            <div
              className="flex-1 overflow-y-auto"
              ref={chatContainerRef}
            >
              <div className="max-w-4xl mx-auto px-6 py-6 space-y-5">
                {activeChat?.messages.map((msg) => (
                  <ChatMessage key={msg.id} message={msg} />
                ))}
                {loadingChats.has(activeChatId) && <LoadingIndicator />}
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
              key={activeChatId}
              message={message}
              onMessageChange={setMessage}
              onSend={handleSendMessage}
              onAttachFile={handleAttachFile}
              onVoiceTranscript={handleVoiceTranscript}
              disabled={loadingChats.has(activeChatId)}
              hasAttachments={attachments.length > 0}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
