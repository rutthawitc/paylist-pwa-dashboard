'use server';

import { PaylistType } from '@/schemas';
import { db } from '@/lib/db';
import { auth } from '@/auth';
import { createAuditLog } from '@/lib/audit-logger';

export const uploadPaylist = async (values: PaylistType[]) => {
  console.log(values);
  try {
    const session = await auth();
    const userArea = session?.user?.area || '';
    const userId = session?.user?.id;

    if (!userId) {
      throw new Error('User not authenticated');
    }

    // บันทึก audit log สำหรับการเริ่มอัปโหลด
    await createAuditLog({
      userId,
      action: 'CREATE',
      resource: 'PayList',
      details: {
        count: values.length,
        area: userArea,
      }
    });

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

    console.log('Paylist uploaded successfully');
    return { success: 'Upload Success' };
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
