import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { LoginSchema } from '@/schemas';
import { getUserRole, getUserbyName, getUserStatus } from '@/lib/user';
import { createAuditLog } from '@/lib/audit-logger';

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);
        console.log('AUTH:', validatedFields);
        if (validatedFields.success) {
          const response = await fetch(`${process.env.PWA_AUTH_URL}`, {
            method: 'POST',
            body: JSON.stringify(validatedFields.data),
          });
          if (response.ok) {
            const user = await response.json();
            console.log('User data from API:', user);

            const userRole: any = await getUserRole(user.username.toString());
            console.log('Auth USER Role:', userRole);
            const userStatus: any = await getUserStatus(user.username.toString());

            // บันทึก audit log สำหรับการ login
            await createAuditLog({
              userId: user.username.toString(),
              action: 'LOGIN',
              resource: 'Users',
              details: {
                success: true,
                role: userRole,
              }
            });

            // สร้าง user object ที่มี type ถูกต้อง
            return {
              id: user.username.toString(),
              name: `${user.firstname || ''} ${user.lastname || ''}`.trim(),
              email: user.email || undefined,
              emailVerified: null, // เพิ่ม emailVerified field
              firstname: user.firstname || undefined,
              lastname: user.lastname || undefined,
              full_name: user.firstname && user.lastname ? `${user.firstname} ${user.lastname}` : undefined,
              costcenter: user.costcenter || undefined,
              ba: user.ba || undefined,
              part: user.part || undefined,
              area: user.area || undefined,
              job_name: user.job_name || undefined,
              level: user.level || undefined,
              div_name: user.div_name || undefined,
              dep_name: user.dep_name || undefined,
              org_name: user.org_name || undefined,
              position: user.position || undefined,
              role: userRole || undefined,
              status: userStatus || undefined,
            };
          } else {
            // บันทึก audit log สำหรับการ login ที่ไม่สำเร็จ
            if (validatedFields.data.username) {
              await createAuditLog({
                userId: validatedFields.data.username,
                action: 'LOGIN',
                resource: 'Users',
                details: {
                  success: false,
                  reason: 'Invalid credentials'
                }
              });
            }
            return null;
          }
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user as any;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.user) {
        session.user = token.user as any;
      }
      return session;
    }
  }
} satisfies NextAuthConfig;
