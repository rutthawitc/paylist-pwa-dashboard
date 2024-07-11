import { Castle } from 'lucide-react';
import Link from 'next/link';

const NavBar = () => {
  return (
    <nav className='hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6'>
      <Link
        href='#'
        className='flex items-center gap-2 text-lg font-semibold md:text-base'>
        <Castle className='h-6 w-6' />
        <span className='sr-only'>PWA</span>
      </Link>
      <Link
        href='/'
        className='text-muted-foreground transition-colors hover:text-foreground'>
        Dashboard
      </Link>
      {/*           <Link
            href='#'
            className='text-muted-foreground transition-colors hover:text-foreground'>
            Orders
          </Link>
          <Link
            href='#'
            className='text-muted-foreground transition-colors hover:text-foreground'>
            Products
          </Link>
          <Link
            href='#'
            className='text-muted-foreground transition-colors hover:text-foreground'>
            Customers
          </Link>
          <Link
            href='#'
            className='text-foreground transition-colors hover:text-foreground'>
            Settings
          </Link> */}
    </nav>
  );
};

export default NavBar;
