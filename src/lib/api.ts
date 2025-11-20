// API service for VQA UI 

/**
 * Interface for the multimodal query response
 */
export interface MultimodalQueryResponse {
  response: string;
  confidence?: number;
  metadata?: Record<string, unknown>;
  context?: Record<string, unknown>[];
}
 
/** 
 * Send a multimodal query to the VQA backend 
 * @param prompt The text prompt to send 
 * @param images Array of image files to send (max 5) 
 * @returns Promise with the response data 
 */ 
export const sendMultimodalQuery = async (prompt: string, images: File[]): Promise<MultimodalQueryResponse> => {
  try {
    // Validate inputs
    if (!prompt.trim() && images.length === 0) {
      throw new Error("Either prompt or at least one image is required");
    }
    
    if (images.length > 5) {
      throw new Error("Maximum 5 images allowed");
    }
    
    // Create form data
    const formData = new FormData();
    formData.append('prompt', prompt);
    
    // Add images if any
    if (images.length > 0) {
      images.forEach(image => {
        formData.append('images', image);
      });
    }
    
    // Send request to the backend
    const response = await fetch('http://localhost:8070/rag/multimodal', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
      },
      body: formData,
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error in multimodal query:', error);
    throw error;
  }
};