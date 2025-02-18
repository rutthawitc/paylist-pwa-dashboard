'use server';

import { PaylistType } from '@/schemas';
import { db } from '@/lib/db';
import { auth } from '@/auth';

export const uploadPaylist = async (values: PaylistType[]) => {
  console.log(values);
  try {
    const session = await auth();
    const userArea = session?.user?.area || '';

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
    return { error: 'An error occurred while uploading the paylist' };
  }
};
