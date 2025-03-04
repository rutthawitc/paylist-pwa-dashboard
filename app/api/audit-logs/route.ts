import { NextRequest, NextResponse } from 'next/server';
import { getAuditLogs } from '@/lib/audit-logger';
import { auth } from '@/auth';

// ระบุให้ route นี้เป็น dynamic เพื่อแก้ไขปัญหา build
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    console.log('Session:', session); // เพิ่ม logging เพื่อ debug
    
    // ตรวจสอบว่าผู้ใช้ login แล้ว
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    // ตรวจสอบสิทธิ์เข้าถึง
    if (session.user.role?.toLowerCase() !== 'admin') {
      return NextResponse.json(
        { error: 'Insufficient permissions - Admin role required' },
        { status: 403 }
      );
    }

    // ดึง query parameters
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get('userId');
    const resource = searchParams.get('resource');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const limit = parseInt(searchParams.get('limit') || '50');
    const page = parseInt(searchParams.get('page') || '1');
    const offset = (page - 1) * limit;

    // แปลง string เป็น Date object ถ้ามีการระบุวันที่
    const startDateTime = startDate ? new Date(startDate) : undefined;
    const endDateTime = endDate ? new Date(endDate) : undefined;

    const result = await getAuditLogs({
      userId: userId || undefined,
      resource: resource as any || undefined,
      startDate: startDateTime,
      endDate: endDateTime,
      limit,
      offset,
    });

    return NextResponse.json({
      data: result.logs,
      pagination: {
        total: result.total,
        page,
        limit,
        totalPages: Math.ceil(result.total / limit),
      }
    });

  } catch (error: any) {
    console.error('Error fetching audit logs:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
