"use client";

import Header from '@/components/protected/header';
import Sidebar from '@/components/protected/sidebar';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { SessionProvider, useSession, signOut } from 'next-auth/react';
import { Session } from 'next-auth';
import { SessionWarning } from '@/components/session-warning';
import { Toaster } from '@/components/ui/toaster';

function ProtectedContent({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    // ตรวจสอบ session status
    if (status === 'unauthenticated') {
      signOut({ redirect: false }).then(() => {
        router.push('/auth/login');
      });
    }

    // ตรวจสอบ session expiration
    const checkSession = async () => {
      try {
        const response = await fetch('/api/auth/session');
        const data = await response.json();
        
        if (!data || !data.user) {
          signOut({ redirect: false }).then(() => {
            router.push('/auth/login');
          });
        }
      } catch (error) {
        console.error('Session check failed:', error);
        signOut({ redirect: false }).then(() => {
          router.push('/auth/login');
        });
      }
    };

    // เช็ค session ทุก 1 นาที
    const sessionCheckInterval = setInterval(checkSession, 60 * 1000);

    // บันทึก log เพื่อตรวจสอบการตั้งค่า
    console.log('Session check interval initialized - checking every 1 minute');

    return () => {
      clearInterval(sessionCheckInterval);
    };
  }, [status, router]);

  if (status === 'loading') {
    return <div>กำลังโหลด...</div>;
  }

  if (!session) {
    return null;
  }

  return (
    <div className='grid min-h-screen w-full md:grid-cols-[180px_1fr] lg:grid-cols-[220px_1fr]'>
      <Sidebar />
      <div className='flex flex-col'>
        <Header />
        {children}
      </div>
    </div>
  );
}

const ProtectedLayout = ({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session;
}) => {
  return (
    <SessionProvider session={session}>
      <ProtectedContent>{children}</ProtectedContent>
      {/* Session timeout ตั้งค่าให้หมดอายุใน 45 นาที (2700 วินาที) */}
      <SessionWarning timeoutSeconds={2700} />
      <Toaster />
    </SessionProvider>
  );
};

export default ProtectedLayout;
