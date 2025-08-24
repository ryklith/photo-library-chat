import { NextRequest, NextResponse } from 'next/server';
import { chatService, ChatMessage } from '@/lib/chat-service';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, chatHistory = [] } = body;

    if (!message || typeof message !== 'string') {
      return NextResponse.json({
        success: false,
        error: 'Message is required and must be a string'
      }, { status: 400 });
    }

    // Convert chat history to proper format
    const formattedHistory: ChatMessage[] = chatHistory.map((msg: any) => ({
      id: msg.id || `msg-${Date.now()}-${Math.random()}`,
      content: msg.content,
      timestamp: new Date(msg.timestamp || Date.now()),
      isUser: msg.isUser || false,
    }));

    const result = await chatService.sendMessage(message, formattedHistory);
    
    if (result.success) {
      const response: any = {
        success: true,
        message: result.message,
        data: result.data
      };
      
      // Include gallery data if available
      if (result.gallery) {
        response.gallery = result.gallery;
      }
      
      return NextResponse.json(response);
    } else {
      return NextResponse.json({
        success: false,
        error: result.error
      }, { status: 400 });
    }
  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json({
      success: false,
      error: 'Internal server error'
    }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const message = searchParams.get('message');
    const chatHistoryParam = searchParams.get('chatHistory');

    if (!message) {
      return NextResponse.json({
        success: false,
        error: 'Message parameter is required'
      }, { status: 400 });
    }

    // Parse chat history from query parameter
    let chatHistory: any[] = [];
    if (chatHistoryParam) {
      try {
        chatHistory = JSON.parse(chatHistoryParam);
      } catch (error) {
        console.warn('Failed to parse chat history:', error);
      }
    }

    // Convert chat history to proper format
    const formattedHistory: ChatMessage[] = chatHistory.map((msg: any) => ({
      id: msg.id || `msg-${Date.now()}-${Math.random()}`,
      content: msg.content,
      timestamp: new Date(msg.timestamp || Date.now()),
      isUser: msg.isUser || false,
    }));

    const result = await chatService.sendMessage(message, formattedHistory);
    
    if (result.success) {
      const response: any = {
        success: true,
        message: result.message,
        data: result.data
      };
      
      // Include gallery data if available
      if (result.gallery) {
        response.gallery = result.gallery;
      }
      
      return NextResponse.json(response);
    } else {
      return NextResponse.json({
        success: false,
        error: result.error
      }, { status: 400 });
    }
  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json({
      success: false,
      error: 'Internal server error'
    }, { status: 500 });
  }
}
