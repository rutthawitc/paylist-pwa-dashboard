import { Castle } from 'lucide-react';
import Link from 'next/link';

const AdminNavBar = () => {
  return (
    <nav className='hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6'>
      <Link
        href='#'
        className='flex items-center gap-2 text-lg font-semibold md:text-base'>
        <Castle className='h-6 w-6' />
        <span className='sr-only'>Acme Inc</span>
      </Link>
      <Link
        href='/'
        className='text-muted-foreground transition-colors hover:text-foreground'>
        Dashboard
      </Link>
      <Link
        href='/upload'
        className='text-muted-foreground transition-colors hover:text-foreground'>
        นำเข้าข้อมูล
      </Link>
      <Link
        href='/rcpname'
        className='text-muted-foreground transition-colors hover:text-foreground'>
        ชื่อผู้รับ
      </Link>
      <Link
        href='/members'
        className='text-muted-foreground transition-colors hover:text-foreground'>
        ผู้ใช้
      </Link>
      {/*       <Link
        href='#'
        className='text-foreground transition-colors hover:text-foreground'>
        Settings
      </Link> */}
      <span className='text-muted-foreground justify-end'>Account</span>
    </nav>
  );
};

export default AdminNavBar;
