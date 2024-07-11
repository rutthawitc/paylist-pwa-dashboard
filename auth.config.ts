import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { LoginSchema } from '@/schemas';
import { getUserRole, getUserbyName, getUserStatus } from '@/lib/user';

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);
        //console.log('AUTH:', validatedFields);
        if (validatedFields.success) {
          const response = await fetch(`${process.env.PWA_AUTH_URL}`, {
            method: 'POST',
            body: JSON.stringify(validatedFields.data),
          });
          if (response.ok) {
            const user = await response.json();
            //console.log('USER id:', user.username.toString());

            const userRole: any = await getUserRole(user.username.toString());
            //console.log('Auth USER  Role:', userRole);
            const userStatus: any = await getUserStatus(
              user.username.toString()
            );

            return {
              id: user.username.toString(),
              firstname: user.firstname,
              lastname: user.lastname,
              full_name: `${user.firstname} ${user.lastname}`,
              email: user.email,
              costcenter: user.costcenter,
              ba: user.ba,
              part: user.part,
              area: user.area,
              job_name: user.job_name,
              level: user.level,
              div_name: user.div_name,
              dep_name: user.dep_name,
              org_name: user.org_name,
              position: user.position,
              role: userRole,
              status: userStatus,
            };
          } else {
            return null;
          }
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
