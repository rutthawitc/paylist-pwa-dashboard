'use server';
import * as z from 'zod';
import { LoginSchema } from '@/schemas';
import { signIn } from '@/auth';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { AuthError } from 'next-auth';

export const login = async (
  values: z.infer<typeof LoginSchema>,
  returnTo?: string | null
) => {
  console.log(values);
  console.log(returnTo);
  const validatedFields = LoginSchema.safeParse(values);
  //console.log(validatedFields);
  if (!validatedFields.success) {
    return { error: 'Invalid username or password' };
  }
  const { username, pwd } = validatedFields.data;
  try {
    await signIn('credentials', {
      username,
      pwd,
      redirectTo: returnTo || DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Invalid Credentials!', success: '' };
        case 'AccessDenied':
          return { error: 'No user or email verified', success: '' };
        case 'CallbackRouteError':
          return { error: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง', success: '' };
        default:
          return { error: 'Unknown error', success: '' };
      }
    }
    throw error;
  }
};
