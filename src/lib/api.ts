// API service for VQA UI 

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';

/**
 * Interface for the multimodal query response
 */
export interface MultimodalQueryResponse {
  response: string;
  request_id: string;
  token_usage?: Record<string, unknown>;
  agent: string;
}

export interface AttachmentSchema {
  type: string;
  name: string;
  url?: string | null;
  description?: string | null;
}

export interface MessageResponse {
  id: string;
  chat_id: string;
  prompt: string;
  response: string;
  attachments?: AttachmentSchema[];
  created_at: string;
}

export interface ChatResponse {
  id: string;
  user_id: string;
  title: string;
  created_at: string;
  updated_at: string;
}
 
// Map to store frontend generated chat IDs to actual backend MongoDB ObjectIDs
const chatMap: Record<string, string> = {};

/** 
 * Send a multimodal query to the VQA backend 
 * @param prompt The text prompt to send 
 * @param images Array of image files to send (max 5) 
 * @param frontendChatId Optional frontend chat ID
 * @returns Promise with the response data 
 */ 
export const sendMultimodalQuery = async (prompt: string, images: File[], frontendChatId?: string): Promise<MultimodalQueryResponse> => {
  try {
    // Validate inputs
    if (!prompt.trim() && images.length === 0) {
      throw new Error("Either prompt or at least one image is required");
    }
    
    if (images.length > 5) {
      throw new Error("Maximum 5 images allowed");
    }

    const isMongoId = (id: string) => /^[0-9a-fA-F]{24}$/.test(id);
    let backendChatId: string | undefined;
    
    if (frontendChatId) {
      if (isMongoId(frontendChatId)) {
        backendChatId = frontendChatId;
      } else {
        backendChatId = chatMap[frontendChatId];
      }
    }

    // If we don't have a backend chat ID, create one
    if (!backendChatId) {
      const createResponse = await fetch(`${API_BASE_URL}/chats`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'accept': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ title: prompt.substring(0, 30) || "New Chat" }),
      });
      
      if (!createResponse.ok) {
        throw new Error(`Failed to create chat: ${createResponse.status}`);
      }
      
      const chatData = await createResponse.json();
      backendChatId = chatData.id as string;
      
      // Store in map if frontend ID was provided and it was NOT a mongo ID
      if (frontendChatId && !isMongoId(frontendChatId)) {
        chatMap[frontendChatId] = backendChatId;
      }
    }
    
    // Create form data
    const formData = new FormData();
    if (prompt.trim()) {
      formData.append('prompt', prompt);
    }
    
    // Add images if any
    if (images.length > 0) {
      images.forEach(image => {
        formData.append('images', image);
      });
    }
    
    // Send request to the core-backend
    const response = await fetch(`${API_BASE_URL}/chats/${backendChatId}/messages`, {
      method: 'POST',
      headers: {
        'accept': 'application/json',
      },
      credentials: 'include',
      body: formData,
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Map backend MessageResponse to MultimodalQueryResponse format for frontend compatibility
    return {
      response: data.response,
      request_id: data.id,
      agent: "orchestrator",
    };
  } catch (error) {
    console.error('Error in multimodal query:', error);
    throw error;
  }
};

/**
 * Get all chats for the current user
 */
export const getChats = async (): Promise<ChatResponse[]> => {
  const response = await fetch(`${API_BASE_URL}/chats`, {
    method: 'GET',
    headers: {
      'accept': 'application/json',
    },
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch chats: ${response.status}`);
  }

  return await response.json();
};

/**
 * Get all messages for a specific chat
 */
export const getChatMessages = async (chatId: string): Promise<MessageResponse[]> => {
  const response = await fetch(`${API_BASE_URL}/chats/${chatId}/messages`, {
    method: 'GET',
    headers: {
      'accept': 'application/json',
    },
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch messages for chat ${chatId}: ${response.status}`);
  }

  return await response.json();
};

/**
 * Login user
 */
export const loginUser = async (email: string, password: string) => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'accept': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    let errorMessage = `Login failed: ${response.status}`;
    if (errorData.detail) {
      errorMessage = typeof errorData.detail === 'string'
        ? errorData.detail
        : Array.isArray(errorData.detail)
          ? errorData.detail.map((e: any) => e.msg).join(", ")
          : JSON.stringify(errorData.detail);
    }
    throw new Error(errorMessage);
  }

  return await response.json();
};

/**
 * Register user
 */
export const registerUser = async (username: string, email: string, password: string) => {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'accept': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ username, email, password }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    let errorMessage = `Registration failed: ${response.status}`;
    if (errorData.detail) {
      errorMessage = typeof errorData.detail === 'string'
        ? errorData.detail
        : Array.isArray(errorData.detail)
          ? errorData.detail.map((e: any) => e.msg).join(", ")
          : JSON.stringify(errorData.detail);
    }
    throw new Error(errorMessage);
  }

  return await response.json();
};

/**
 * Logout user
 */
export const logoutUser = async () => {
  const response = await fetch(`${API_BASE_URL}/auth/logout`, {
    method: 'POST',
    credentials: 'include',
  });
  
  if (!response.ok) {
    throw new Error('Logout failed');
  }
};

/**
 * Get current user
 */
export const getCurrentUser = async () => {
  const response = await fetch(`${API_BASE_URL}/auth/me`, {
    method: 'GET',
    headers: {
      'accept': 'application/json',
    },
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch user');
  }

  return await response.json();
};

/**
 * Delete a chat
 */
export const deleteChat = async (chatId: string): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/chats/${chatId}`, {
    method: 'DELETE',
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error(`Failed to delete chat ${chatId}: ${response.status}`);
  }
};

/**
 * Rename a chat
 */
export const renameChat = async (chatId: string, title: string): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/chats/${chatId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'accept': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ title }),
  });

  if (!response.ok) {
    throw new Error(`Failed to rename chat ${chatId}: ${response.status}`);
  }
};