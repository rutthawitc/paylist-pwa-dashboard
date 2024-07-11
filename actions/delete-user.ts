'use server';
import { db } from '@/lib/db';
import * as z from 'zod';
import { UserSchema } from '@/schemas';
import { getUserbyName } from '@/lib/user';

export const deleteUser = async (values: z.infer<typeof UserSchema>) => {
  const { id } = values;
  await db.users.delete({ where: { id } });
  return { success: 'Delete User Success' };
};
