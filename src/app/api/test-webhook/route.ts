import { NextRequest, NextResponse } from 'next/server';
import { chatService } from '@/lib/chat-service';

export async function POST(request: NextRequest) {
  try {
    const result = await chatService.testWebhook();
    
    if (result.success) {
      return NextResponse.json({
        success: true,
        message: result.message,
        data: result.data
      });
    } else {
      return NextResponse.json({
        success: false,
        error: result.error
      }, { status: 400 });
    }
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({
      success: false,
      error: 'Internal server error'
    }, { status: 500 });
  }
}

export async function GET() {
  const status = chatService.getWebhookStatus();
  
  return NextResponse.json({
    configured: status.configured,
    url: status.url
  });
}
