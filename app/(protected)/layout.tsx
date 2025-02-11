import Header from '@/components/protected/header';
import Sidebar from '@/components/protected/sidebar';

import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';
import { SessionWarning } from '@/components/session-warning';
import { Toaster } from '@/components/ui/toaster';

const ProtectedLayout = ({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session;
}) => {
  return (
    <SessionProvider session={session}>
      <div className='grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]'>
        <Sidebar />
        <div className='flex flex-col'>
          <Header />
          {children}
        </div>
      </div>
      <SessionWarning timeoutSeconds={300} />
      <Toaster />
    </SessionProvider>
  );
};

export default ProtectedLayout;
