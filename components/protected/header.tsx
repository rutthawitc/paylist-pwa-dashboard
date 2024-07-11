'use client';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import MobileMenuList from '@/components/protected/mobile-menu-list';

import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';

const Header = () => {
  const { data: session } = useSession();
  //console.log(session);
  const handleSignOut = async () => {
    await signOut({ callbackUrl: process.env.LOGOUT_URL });
  };

  return (
    <header className='flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6'>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant='outline' size='icon' className='shrink-0 md:hidden'>
            <Menu className='h-5 w-5' />
            <span className='sr-only'>Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side='left' className='flex flex-col'>
          <MobileMenuList />
          <div className='mt-auto'>
            <Card>
              <CardHeader>
                <CardDescription></CardDescription>
              </CardHeader>
              <CardContent>
                <Button size='sm' className='w-full' onClick={handleSignOut}>
                  Logout
                </Button>
              </CardContent>
            </Card>
          </div>
        </SheetContent>
      </Sheet>
      <div className='w-full flex-1'>
        {/*           <form>
            <div className='relative'>
              <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
              <Input
                type='search'
                placeholder='Search products...'
                className='w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3'
              />
            </div>
          </form> */}
      </div>
      <p className='text-md font-medium md:text-md md:font-medium'>
        {session?.user?.firstname ? session?.user?.firstname : 'User'} (
        {session?.user?.role?.toLocaleUpperCase()})
      </p>
      <Button
        variant='default'
        size='sm'
        className='mx-2'
        onClick={handleSignOut}>
        Logout
      </Button>

      {/*         <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='secondary' size='icon' className='rounded-full'>
              <CircleUser className='h-5 w-5' />
              <span className='sr-only'>Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu> */}
    </header>
  );
};

export default Header;
