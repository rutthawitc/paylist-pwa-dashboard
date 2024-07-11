import { Card, CardContent, CardHeader } from '@/components/ui/card';
import Link from 'next/link';

const Page = () => {
  return (
    <main className='flex flex-1 flex-col gap-4 p-4 lg:gap-2 lg:p-4'>
      <div className='flex items-center'>
        <div
          className='flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm mt-6'
          x-chunk='dashboard-02-chunk-1'>
          <div className='flex flex-col items-center gap-1 text-center p-8'>
            <h3 className='text-2xl font-bold tracking-tight'>
              ถูกจำกัดสิทธิ์
            </h3>
            <p className='text-sm text-muted-foreground'>
              ไม่สามารถใช้งานหน้านี้ได้ โปรดติดต่อผู้ดูแลระบบ
            </p>
            <hr />
            <p className='text-sm  font-bold'>
              <Link href='/'>กลับสู่หน้าหลัก</Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Page;
