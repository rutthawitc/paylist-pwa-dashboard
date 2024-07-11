import z, { number } from 'zod';

export const LoginSchema = z.object({
  username: z.string().min(1, { message: 'รหัสพนักงานไม่สามารถว่างได้' }),
  pwd: z
    .string()
    .min(6, { message: 'Password is required (ระบบ PWA Intranet)' }),
});

export const AddUserSchema = z.object({
  name: z.string().min(1, { message: 'รหัสพนักงานไม่สามารถว่างได้' }),
  role: z.string().nullable(),
  status: z.string().nullable(),
});

export const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  role: z.string(),
  status: z.string(),
});

export const PaylistSchema = z.object({
  doc_no: z.string(),
  trans_type: z.string(),
  due_date: z.string(),
  recipient: z.string(),
  amount: z.string(),
});

export const RecipientSchema = z.object({
  id: number(),
  short_name: z.string(),
  full_name: z.string(),
  created_at: z.date(),
  updated_at: z.date(),
});

export const AddRecipientSchema = z.object({
  short_name: z.string().min(1, { message: 'ไม่สามารถว่างได้' }),
  full_name: z.string().min(1, { message: 'ชื่อผู้รับไม่สามารถว่างได้' }),
});

export type PaylistType = z.infer<typeof PaylistSchema>;
