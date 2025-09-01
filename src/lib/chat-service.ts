/**
 * Chat Service
 * 
 * Handles communication with the n8n webhook for chat functionality
 */

import { env } from './env';
import { galleryService, GalleryData } from './gallery-service';

export interface ChatMessage {
  id: string;
  content: string;
  timestamp: Date;
  isUser: boolean;
}

export interface ChatResponse {
  success: boolean;
  message?: string;
  error?: string;
  data?: any;
  gallery?: GalleryData;
}

export class ChatService {
  private webhookUrl: string;

  constructor() {
    this.webhookUrl = env.N8N_CHAT_WEBHOOK_URL || '';
    
    if (!this.webhookUrl) {
      console.warn('⚠️ N8N_CHAT_WEBHOOK_URL is not configured');
    }
  }

  /**
   * Test if the webhook is working
   */
  async testWebhook(): Promise<ChatResponse> {
    if (!this.webhookUrl) {
      return {
        success: false,
        error: 'Webhook URL not configured'
      };
    }

    try {
      console.log('🧪 Testing webhook connection...', this.webhookUrl);
      
      const response = await fetch(this.webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'test',
          message: 'Hello from Photo Library Chat!',
          timestamp: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('✅ Webhook test successful:', data);
      
      return {
        success: true,
        message: data.output || 'Webhook is working correctly',
        data: {
          response: data.output || data.message || 'Webhook test successful',
          intermediateSteps: data.intermediateSteps || [],
          raw: data
        }
      };
    } catch (error) {
      console.error('❌ Webhook test failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  /**
   * Send a chat message to the webhook
   */
  async sendMessage(message: string, chatHistory: ChatMessage[] = []): Promise<ChatResponse> {
    if (!this.webhookUrl) {
      return {
        success: false,
        error: 'Webhook URL not configured'
      };
    }

    try {
      console.log('📤 Sending message to webhook:', message);
      
      const payload = {
        type: 'chat_message',
        message: message,
        chatHistory: chatHistory.map(msg => ({
          content: msg.content,
          isUser: msg.isUser,
          timestamp: msg.timestamp.toISOString(),
        })),
        timestamp: new Date().toISOString(),
        userId: 'user-' + Date.now(), // Simple user ID for demo
      };

      const response = await fetch(this.webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('✅ Message sent successfully:', data);
      
      // Extract gallery data if available
      console.log('🖼️ Attempting to extract gallery data...');
      const galleryData = galleryService.extractGalleryData(data);
      console.log('🖼️ Gallery extraction result:', galleryData);
      
      // Handle nested output structure
      let responseText = 'Message processed successfully';
      if (data.output) {
        if (typeof data.output === 'string') {
          responseText = data.output;
        } else if (data.output.output) {
          responseText = data.output.output;
        }
      } else if (data.message) {
        responseText = data.message;
      }

      const result = {
        success: true,
        message: 'Message sent successfully',
        data: {
          response: responseText,
          intermediateSteps: data.intermediateSteps || [],
          raw: data
        }
      };

      // Add gallery data if available
      if (galleryData) {
        result.gallery = galleryData;
      }

      console.log('📤 Final response structure:', result);
      return result;
    } catch (error) {
      console.error('❌ Failed to send message:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  /**
   * Get webhook status
   */
  getWebhookStatus(): { configured: boolean; url: string } {
    return {
      configured: !!this.webhookUrl,
      url: this.webhookUrl || 'Not configured'
    };
  }
}

// Export singleton instance
export const chatService = new ChatService();
