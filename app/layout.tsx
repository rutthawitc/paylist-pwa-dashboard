import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { cn } from '@/lib/utils';
import { SessionWarning } from '@/components/session-warning';

const fontSans = localFont({
  src: [
    {
      path: '../public/fonts/kanit/Kanit-Light.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../public/fonts/kanit/Kanit-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/kanit/Kanit-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/kanit/Kanit-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../public/fonts/kanit/Kanit-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'ระบบแจ้งรายการจ่ายเงิน กปภ.ข.๖',
  description: 'ระบบแจ้งรายการจ่ายเงิน กองบัญชีฯ กปภ.ข.๖',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body
        className={cn('min-h-screen antialiased font-sans', fontSans.variable)}>
        <SessionWarning timeoutSeconds={600} />
        {children}
      </body>
    </html>
  );
}
