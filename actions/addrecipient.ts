'use server';

import * as z from 'zod';
import { AddRecipientSchema } from '@/schemas';
import { db } from '@/lib/db';
import { getRecipientByName } from '@/lib/recipient-data';

export const addrecipient = async (
  values: z.infer<typeof AddRecipientSchema>
) => {
  const validatedFields = AddRecipientSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: 'Something Wrong!' };
  }
  const recipientCheck = await getRecipientByName(values.short_name);
  if (recipientCheck) {
    return { error: 'Recipient already exists' };
  }
  await db.companyname.create({
    data: {
      short_name: values.short_name,
      full_name: values.full_name,
    },
  });
  return { success: 'Add Recipient Success' };
};
