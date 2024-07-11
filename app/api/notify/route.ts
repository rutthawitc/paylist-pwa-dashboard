import axios, { AxiosResponse } from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest): Promise<NextResponse> {
  const body: { message: string } = await request.json();
  const url: string = 'https://notify-api.line.me/api/notify';
  const token: string | undefined = process.env.LINE_NOTIFY_TOKEN;
  const message: string = body.message;

  if (!token) {
    return NextResponse.json(
      { error: 'LINE_NOTIFY_TOKEN is not set' },
      { status: 500 }
    );
  }

  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Bearer ${token}`,
    },
  };
  const data: string = `message=${encodeURIComponent(message)}`;

  try {
    const response: AxiosResponse = await axios.post(url, data, config);
    return NextResponse.json({ message: 'Send Line successfully' });
  } catch (error) {
    console.error('Error sending Line notification:', error);
    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        { error: error.message },
        { status: error.response?.status || 500 }
      );
    }
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
