// Global state management for Wildfire VQA application

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  attachment?: {
    type: 'image' | 'video';
    url: string;
    name: string;
  };
}

export interface ChatHistory {
  id: string;
  title: string;
  date: string;
  messages: ChatMessage[];
}

// Global state - can be replaced with Context API or state management library later
class GlobalState {
  private currentView: 'chat' | 'analytics' = 'chat';
  private activeChatId: string | null = null;
  private chatHistories: ChatHistory[] = [];

  getCurrentView() {
    return this.currentView;
  }

  setCurrentView(view: 'chat' | 'analytics') {
    this.currentView = view;
  }

  getActiveChatId() {
    return this.activeChatId;
  }

  setActiveChatId(id: string | null) {
    this.activeChatId = id;
  }

  getChatHistories() {
    return this.chatHistories;
  }

  addChatHistory(chat: ChatHistory) {
    this.chatHistories.unshift(chat);
  }

  getChatById(id: string) {
    return this.chatHistories.find(chat => chat.id === id);
  }
}

export const globalState = new GlobalState();
