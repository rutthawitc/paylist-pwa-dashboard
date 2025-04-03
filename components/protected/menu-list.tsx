'use client';

import { BookA, FileUp, Home, LineChart, Users, History, Bell } from 'lucide-react';
import Link from 'next/link';

import { useSession } from 'next-auth/react';

const MenuList = () => {
  const { data: session } = useSession();
  return (
    <nav className='grid items-start px-2 text-sm font-medium lg:px-4'>
      <Link
        href='/dashboard'
        className='flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary'>
        <Home className='h-4 w-4' />
        Dashboard
      </Link>
      <Link
        href='/upload'
        className='flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary'>
        <FileUp className='h-4 w-4' />
        Upload Data
      </Link>
      <Link
        href='/recipient'
        className='flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary'>
        <BookA className='h-4 w-4' />
        Recipient List
      </Link>
      {/* เมนูสำหรับผู้ดูแลระบบ (admin) เท่านั้น */}
      {session?.user?.role === 'admin' && (
        <>
          <Link
            href='/members'
            className='flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary'>
            <Users className='h-4 w-4' />
            Users
          </Link>
          <Link
            href='/audit-logs'
            className='flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary'>
            <History className='h-4 w-4' />
            ประวัติการใช้งาน
          </Link>
        </>
      )}
        
      {/* เมนูสำหรับทั้ง admin และ superuser */}
      {(session?.user?.role === 'admin' || session?.user?.role === 'superuser') && (
        <Link
          href='/notifications'
          className='flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary'>
          <Bell className='h-4 w-4' />
          การแจ้งเตือน
        </Link>
      )}

      {/*       <Link
        href='#'
        className='flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary'>
        <LineChart className='h-4 w-4' />
        Analytics
      </Link> */}
    </nav>
  );
};

export default MenuList;
