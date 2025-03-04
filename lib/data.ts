import { db } from '@/lib/db';
import { DatabaseConnectionError } from './exceptions';
import { auth } from '@/auth';

interface PayData {
  unique_id: string | null;
  doc_no: string | null;
  trans_type: string | null;
  due_date: string | null;
  recipient: string | null;
  amount: string | null;
  upload_at: Date;
}

/**
 * Retrieves payment data from the database asynchronously.
 *
 * @return {Promise<PayData[]>} An array of payment data objects.
 */
export const getPayData = async (options?: {
  cache: 'no-store';
}): Promise<PayData[]> => {
  try {
    // ลบคำสั่ง db.$connect() ที่ไม่จำเป็น
    const payData = await db.payList.findMany();
    return payData;
  } catch (error) {
    console.error('Database connection error:', error);
    throw new DatabaseConnectionError();
  }
  // ลบ finally block ที่มี db.$disconnect()
};

/**
 * Retrieves the record count from the database asynchronously.
 *
 * @return {Promise<number>} The count of records in the database.
 */
export const getAllRecordCount = async (options?: { cache: 'no-store' }) => {
  try {
    // ลบคำสั่ง db.$connect() ที่ไม่จำเป็น
    const count = await db.payList.count();
    return count;
  } catch (error) {
    console.error('Database connection error:', error);
    throw new DatabaseConnectionError();
  }
  // ลบ finally block ที่มี db.$disconnect()
};

/**
 * Returns a new Date object with only the year, month, and day components from the input date.
 *
 * @param {Date} date - The input date from which to extract the year, month, and day.
 * @return {Date} A new Date object with only the year, month, and day components.
 */
function getDateOnly(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}
function getMonthName(date: Date): string {
  const monthNames = [
    'มกราคม',
    'กุมภาพันธ์',
    'มีนาคม',
    'เมษายน',
    'พฤษภาคม',
    'มิถุนายน',
    'กรกฎาคม',
    'สิงหาคม',
    'กันยายน',
    'ตุลาคม',
    'พฤศจิกายน',
    'ธันวาคม',
  ];
  return monthNames[date.getMonth()];
}

/**
 * Retrieves the summary of the latest payment list upload, including the count of items uploaded on the latest day,
 * the total count of items uploaded within the current month, and the name of the current month.
 *
 * @return {Object} An object containing the latest upload date, count, the total monthly count, and the name of the month.
 */
export const getPayListSummary = async (options?: { cache: 'no-store' }) => {
  try {
    // Get user's area from session
    const session = await auth();
    const userArea = session?.user?.area || '';

    // Add area filter if user has area
    const areaFilter = userArea ? { area: userArea } : {};

    const latestUploads = await db.payList.findMany({
      where: areaFilter,
      orderBy: {
        upload_at: 'desc',
      },
      take: 1,
    });

    if (latestUploads.length === 0) {
      return { latestUpload: null, monthlyCount: 0, monthName: '' };
    }

    const latestUpload = latestUploads[0];
    const latestDate = new Date(latestUpload.upload_at);
    const latestDateOnly = getDateOnly(latestDate);

    // นับจำนวนรายการในวันล่าสุด (เฉพาะ area ของ user)
    const latestCount = await db.payList.count({
      where: {
        ...areaFilter,
        upload_at: {
          gte: latestDateOnly,
          lt: new Date(latestDateOnly.getTime() + 24 * 60 * 60 * 1000), // วันถัดไป
        },
      },
    });

    // จำนวน record ที่นำเข้าทั้งหมด ณ เดือนนั้น (เฉพาะ area ของ user)
    const monthStart = new Date(
      latestDate.getFullYear(),
      latestDate.getMonth(),
      1
    );
    const monthEnd = new Date(
      latestDate.getFullYear(),
      latestDate.getMonth() + 1,
      0,
      23,
      59,
      59
    );

    const monthlyCount = await db.payList.count({
      where: {
        ...areaFilter,
        upload_at: {
          gte: monthStart,
          lte: monthEnd,
        },
      },
    });

    const monthName = getMonthName(latestDate);

    return {
      latestUpload: {
        date: latestDateOnly.toISOString().split('T')[0],
        count: latestCount,
        upload_date: latestDate.toISOString().split('T')[0],
      },
      monthlyCount,
      monthName,
    };
  } catch (error) {
    console.error('Database connection error:', error);
    throw new DatabaseConnectionError();
  }
};
