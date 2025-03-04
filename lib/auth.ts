// /lib/auth.ts
import authConfig from '@/auth.config';
import { AuthOptions } from 'next-auth';

// Export authOptions which is based on our auth.config
export const authOptions: AuthOptions = {
  ...authConfig,
  // We need this for getServerSession to work properly
  secret: process.env.NEXTAUTH_SECRET,
};
