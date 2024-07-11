'use server';
import * as z from 'zod';
import { AddUserSchema } from '@/schemas';
import { getUserbyName } from '@/lib/user';
import { db } from '@/lib/db';
export const adduser = async (values: z.infer<typeof AddUserSchema>) => {
  //   const userCheck = await db.users.findMany();
  //   console.log(JSON.stringify(userCheck, null, 2));

  const validatedFields = AddUserSchema.safeParse(values);
  console.log(validatedFields);
  if (!validatedFields.success) {
    return { error: 'Something Wrong!' };
  }
  const existingUser = await getUserbyName(values.name);
  if (existingUser) {
    return { error: 'User already exists' };
  }

  await db.users.create({
    data: {
      name: values.name,
      role: values.role,
      status: values.status,
    },
  });
  return { success: 'Add User Success' };
};
