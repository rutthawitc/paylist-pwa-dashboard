import NextAuth, { DefaultSession, User, Account, Profile } from 'next-auth';
import authConfig from '@/auth.config';
import { JWT } from 'next-auth/jwt';

// กำหนดประเภทข้อมูลเพิ่มเติมสำหรับ user
interface ExtendedUser extends User {
  firstname?: string;
  lastname?: string;
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
}
// ขยาย Session type
declare module 'next-auth' {
  interface Session {
    user: ExtendedUser & DefaultSession['user'];
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: '/auth/login',
    signOut: '/',
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: ExtendedUser }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: JWT }) {
      session.user = token.user as ExtendedUser & DefaultSession['user'];
      return session;
    },
  },
  ...authConfig,
  session: {
    strategy: 'jwt',
    maxAge: 60 * 15, // 15 นาที (หน่วยเป็นวินาที)
  },
  secret: process.env.NEXTAUTH_SECRET,
});
