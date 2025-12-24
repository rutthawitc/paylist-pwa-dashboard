'use server';

import { PaylistType } from '@/schemas';
import { db } from '@/lib/db';
import { auth } from '@/auth';
import { createAuditLog } from '@/lib/audit-logger';
import { revalidatePath } from 'next/cache';

export const uploadPaylist = async (values: PaylistType[]) => {
  console.log(values);
  try {
    const session = await auth();
    const userArea = session?.user?.area || '';
    const userId = session?.user?.id;

    if (!userId) {
      throw new Error('User not authenticated');
    }

    // บันทึก audit log
    await createAuditLog({
      userId,
      action: 'CREATE',
      resource: 'PayList',
      details: {
        total_count: values.length,
        saved_count: values.length,
        area: userArea,
      }
    });

    // บันทึกข้อมูลทั้งหมดที่ส่งมา (frontend filter แล้ว)
    for (const item of values) {
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

    // Return success message
    return {
      success: `นำเข้าสำเร็จ ${values.length} รายการ`,
      stats: {
        total: values.length,
        saved: values.length,
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
