import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';

const fontSans = FontSans({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'ระบบแจ้งรายการจ่ายเงิน กปภ.ข.๖',
  description: 'ระบบแจ้งรายการจ่ายเงิน กองบัญชีฯ กปภ.ข.๖',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={cn('min-h-screen antialiased font-sans', fontSans.variable)}>
        {children}
      </body>
    </html>
  );
}
