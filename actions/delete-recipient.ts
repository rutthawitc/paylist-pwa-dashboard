'use server';

import { db } from '@/lib/db';
import * as z from 'zod';

/**
 * Deletes a recipient from the database.
 *
 * @param {Object} params - The parameters for deleting the recipient.
 * @param {number} params.id - The ID of the recipient to delete.
 * @param {string} params.short_name - The short name of the recipient.
 * @param {string} params.full_name - The full name of the recipient.
 * @return {Promise<Object>} - A promise that resolves to an object with a success message.
 */
export const deleteRecipient = async ({
  id,
  short_name,
  full_name,
}: {
  id: number;
  short_name: string;
  full_name: string;
}): Promise<object> => {
  await db.companyname.delete({ where: { id } });
  return { success: 'Delete Recipient Success' };
};
