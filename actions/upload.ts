'use server';

import { PaylistType } from '@/schemas';
import { db } from '@/lib/db';
import { auth } from '@/auth';
import { createAuditLog } from '@/lib/audit-logger';
import { revalidatePath } from 'next/cache';

/**
 * Check if vendor code matches employee pattern (EI0*)
 */
const isEmployeeVendorCode = (vendorCode: string): boolean => {
  return /^EI0\d+$/i.test(vendorCode);
};

export const uploadPaylist = async (values: PaylistType[]) => {
  console.log(values);
  try {
    const session = await auth();
    const userArea = session?.user?.area || '';
    const userId = session?.user?.id;

    if (!userId) {
      throw new Error('User not authenticated');
    }

    // EMPLOYEE FILTERING: แยกรายการพนักงานออก
    const nonEmployeeRecords: PaylistType[] = [];
    const filteredEmployees: PaylistType[] = [];

    for (const item of values) {
      if (isEmployeeVendorCode(item.doc_no)) {
        filteredEmployees.push(item);
      } else {
        nonEmployeeRecords.push(item);
      }
    }

    // บันทึก audit log พร้อมข้อมูลการกรอง
    await createAuditLog({
      userId,
      action: 'CREATE',
      resource: 'PayList',
      details: {
        total_count: values.length,
        saved_count: nonEmployeeRecords.length,
        filtered_employee_count: filteredEmployees.length,
        area: userArea,
      }
    });

    // บันทึกเฉพาะรายการที่ไม่ใช่พนักงาน
    for (const item of nonEmployeeRecords) {
      await db.payList.create({
        data: {
          doc_no: item.doc_no.toString(),
          trans_type: item.trans_type,
          due_date: item.due_date,
          recipient: item.recipient,
          amount: item.amount,
          area: userArea,
        },
      });
    }

    // Revalidate dashboard and related pages to show updated data
    revalidatePath('/dashboard');
    revalidatePath('/');

    console.log('Paylist uploaded successfully');

    // Return success message with filter statistics
    return {
      success: `นำเข้าสำเร็จ ${nonEmployeeRecords.length} รายการ${filteredEmployees.length > 0 ? ` (กรองพนักงาน ${filteredEmployees.length} รายการ)` : ''}`,
      stats: {
        total: values.length,
        saved: nonEmployeeRecords.length,
        filtered: filteredEmployees.length,
      }
    };
  } catch (error) {
    console.error('Error uploading paylist:', error);

    // บันทึก audit log สำหรับการอัปโหลดที่ไม่สำเร็จ
    if (error instanceof Error) {
      const session = await auth();
      const userId = session?.user?.id;

      if (userId) {
        await createAuditLog({
          userId,
          action: 'CREATE',
          resource: 'PayList',
          details: {
            error: error.message,
            success: false
          }
        });
      }
    }

    return { error: 'An error occurred while uploading the paylist' };
  }
};
