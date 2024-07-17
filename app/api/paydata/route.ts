import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const payData = await db.payList.findMany();
    return NextResponse.json(payData);
  } catch (error) {
    console.error('Error fetching pay data:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
