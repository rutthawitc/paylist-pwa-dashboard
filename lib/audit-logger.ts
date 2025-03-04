import { Prisma } from '@prisma/client';
import { headers } from 'next/headers';
import { db } from '@/lib/db';

export type AuditAction = 'CREATE' | 'UPDATE' | 'DELETE' | 'LOGIN' | 'LOGOUT' | 'NOTIFY';
export type AuditResource = 'PayList' | 'Users' | 'Companyname';

export interface AuditLogParams {
  userId: string;
  action: AuditAction;
  resource: AuditResource;
  details?: Prisma.InputJsonValue;
}

export async function createAuditLog({
  userId,
  action,
  resource,
  details
}: AuditLogParams) {
  try {
    const headersList = headers();
    const userAgent = headersList.get('user-agent');
    const ipAddress = headersList.get('x-forwarded-for') || 
                     headersList.get('x-real-ip');

    await db.auditLog.create({
      data: {
        userId,
        action,
        resource,
        details: details || Prisma.JsonNull,
        userAgent: userAgent || null,
        ipAddress: ipAddress?.toString() || null,
      },
    });
  } catch (error) {
    console.error('Failed to create audit log:', error);
    // อาจจะเพิ่ม error monitoring service ในอนาคต
  }
}

// Utility function สำหรับดึงข้อมูล audit logs
export async function getAuditLogs({
  userId,
  resource,
  startDate,
  endDate,
  limit = 50,
  offset = 0,
}: {
  userId?: string;
  resource?: AuditResource;
  startDate?: Date;
  endDate?: Date;
  limit?: number;
  offset?: number;
}) {
  try {
    const where: any = {};
    
    if (userId) where.userId = userId;
    if (resource) where.resource = resource;
    if (startDate || endDate) {
      where.createdAt = {};
      if (startDate) where.createdAt.gte = startDate;
      if (endDate) where.createdAt.lte = endDate;
    }

    const [total, logs] = await Promise.all([
      db.auditLog.count({ where }),
      db.auditLog.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        take: limit,
        skip: offset,
      }),
    ]);

    return {
      total,
      logs,
    };
  } catch (error) {
    console.error('Failed to fetch audit logs:', error);
    throw error;
  }
}
