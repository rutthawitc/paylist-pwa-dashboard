import NextAuth, { DefaultSession, User as NextAuthUser } from 'next-auth';
import { AdapterUser } from 'next-auth/adapters';
import authConfig from '@/auth.config';
import { JWT } from 'next-auth/jwt';

// กำหนดประเภทข้อมูลเพิ่มเติมสำหรับ user
interface ExtendedUser extends NextAuthUser {
  firstname?: string;
  lastname?: string;
  full_name?: string;
  email?: string;
  costcenter?: string;
  ba?: string;
  part?: string;
  area?: string;
  job_name?: string;
  level?: string;
  div_name?: string;
  dep_name?: string;
  org_name?: string;
  position?: string;
  role?: string;
  status?: string;
  emailVerified?: Date | null;
}

// ขยาย Session type
declare module 'next-auth' {
  interface Session {
    user: ExtendedUser & DefaultSession['user'];
  }
}

// ขยาย JWT type
declare module 'next-auth/jwt' {
  interface JWT {
    user?: ExtendedUser;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  pages: {
    signIn: '/auth/login',
    signOut: '/',
  },
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60, // 1 ชั่วโมง
  },
  secret: process.env.NEXTAUTH_SECRET
});
