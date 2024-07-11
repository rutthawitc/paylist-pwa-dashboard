import Link from 'next/link';
import { CircleUser, Menu, Package2, Search } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

import PaylistTable from '@/components/paytables/paylist-table';
import NavBar from '@/components/nav-bar';
import UserMenuBar from '@/components/user-menubar';

export default function Dashboard() {
  return (
    <div className='flex min-h-screen w-full flex-col'>
      <header className='sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6'>
        <NavBar />
        <div className='flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4'>
          <UserMenuBar />
        </div>
      </header>
      <main className='flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-2 md:gap-3 md:p-4'>
        <div className='mx-auto grid w-full gap-2'>
          <h1 className='text-xl font-bold'>รายการจ่ายเงิน</h1>
          <div className='grid w-full'>
            <Card>
              <CardHeader>
                {/* <CardTitle>Card Title</CardTitle> */}
                {/*  <CardDescription>รายการจ่ายเงิน</CardDescription> */}
              </CardHeader>
              <CardContent>
                <PaylistTable />
              </CardContent>
              <CardFooter>
                <p className='text-xs text-muted-foreground'>
                  กองเทคโนโลยีสารสนเทศ งานประมวลข้อมูล กปภ.ข.๖
                </p>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
