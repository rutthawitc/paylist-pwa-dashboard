import axios, { AxiosResponse } from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest): Promise<NextResponse> {
  const body: { chatId: string; message: string } = await request.json();
  const botToken: string | undefined = process.env.TELEGRAM_BOT_TOKEN;
  const { chatId, message } = body;

  if (!botToken) {
    return NextResponse.json(
      { error: 'TELEGRAM_BOT_TOKEN is not set' },
      { status: 500 }
    );
  }

  if (!chatId) {
    return NextResponse.json(
      { error: 'Chat ID is required' },
      { status: 400 }
    );
  }

  const url: string = `https://api.telegram.org/bot${botToken}/sendMessage`;
  
  const data = {
    chat_id: chatId,
    text: message,
    parse_mode: 'HTML', // Supports HTML formatting
  };

  try {
    const response: AxiosResponse = await axios.post(url, data);
    return NextResponse.json({ 
      message: 'Telegram message sent successfully',
      result: response.data
    });
  } catch (error) {
    console.error('Error sending Telegram notification:', error);
    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        { error: error.message, details: error.response?.data },
        { status: error.response?.status || 500 }
      );
    }
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
