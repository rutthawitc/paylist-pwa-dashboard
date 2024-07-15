import { db } from '@/lib/db';

/**
 * Retrieves payment data from the database asynchronously.
 *
 * @return {Promise<PayData[]>} An array of payment data objects.
 */
export const getPayData = async () => {
  try {
    const payData = await db.payList.findMany();
    //console.log(payData);
    return payData;
  } catch (error) {
    console.log(error);
    return [];
  }
};

/**
 * Retrieves the record count from the database asynchronously.
 *
 * @return {Promise<number>} The count of records in the database.
 */
export const getAllRecordCount = async () => {
  try {
    const count = await db.payList.count();
    return count;
  } catch (error) {
    console.log(error);
    return 0;
  }
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
export const getPayListSummary = async () => {
  await db.$disconnect();
  await db.$connect();

  const latestUploads = await db.payList.findMany({
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

  console.log('latestDate', latestDate);
  console.log('latestDateOnly', latestDateOnly);

  // นับจำนวนรายการในวันล่าสุด
  const latestCount = await db.payList.count({
    where: {
      upload_at: {
        gte: latestDateOnly,
        lt: new Date(latestDateOnly.getTime() + 24 * 60 * 60 * 1000), // วันถัดไป
      },
    },
  });

  // จำนวน record ที่นำเข้าทั้งหมด ณ เดือนนั้น
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
      upload_at: {
        gte: monthStart,
        lte: monthEnd,
      },
    },
  });

  const monthName = getMonthName(latestDate);

  return {
    latestUpload: {
      date: latestDateOnly.toISOString().split('T')[0], // เก็บเฉพาะวันที่ในรูปแบบ YYYY-MM-DD
      count: latestCount,
      upload_date: latestDate.toISOString().split('T')[0], // เก็บเฉพาะวันที่ในรูปแบบ YYYY-MM-DD
    },
    monthlyCount,
    monthName,
  };
};
