'use server';
import { db } from '@/lib/db';
import { UserSchema } from '@/schemas';
import * as z from 'zod';

export const setStatus = async (values: z.infer<typeof UserSchema>) => {
  const { id, status } = values;
  await db.users.update({ where: { id }, data: { status } });
};
