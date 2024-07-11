import {
  Badge,
  BookA,
  Castle,
  FileUp,
  Home,
  LineChart,
  Users,
} from 'lucide-react';
import Link from 'next/link';
const MobileMenuList = () => {
  return (
    <nav className='grid gap-2 text-sm font-medium'>
      <Link href='#' className='flex items-center gap-2 text-lg font-semibold'>
        <Castle className='h-6 w-6' />
        <span className='sr-only'>PWA</span>
      </Link>
      <Link
        href='#'
        className='mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground'>
        <Home className='h-5 w-5' />
        Dashboard
      </Link>
      <Link
        href='#'
        className='mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground'>
        <FileUp className='h-5 w-5' />
        Upload Data
      </Link>
      <Link
        href='#'
        className='mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground'>
        <BookA className='h-5 w-5' />
        Recipient List
      </Link>
      <Link
        href='#'
        className='mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground'>
        <Users className='h-5 w-5' />
        Users
      </Link>
      <Link
        href='#'
        className='mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground'>
        <LineChart className='h-5 w-5' />
        Analytics
      </Link>
    </nav>
  );
};

export default MobileMenuList;
