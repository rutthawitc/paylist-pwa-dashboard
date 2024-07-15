//import { getLastUploadandCount } from '@/lib/data';
import { getPayListSummary } from '@/lib/data';
import { db } from '@/lib/db';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { DataTable } from '@/components/paytables/data-table';
import { columns } from '@/components/paytables/columns';
import { getPayData } from '@/lib/data';

const DashBoardPage = async () => {
  const uploadInfo = await getPayListSummary();
  const data: any = await getPayData();

  return (
    <main className='flex flex-1 flex-col gap-4 p-4 lg:gap-2 lg:p-4'>
      <div className='flex items-center'>
        <h1 className='text-xs font-semibold md:text-2xl'>
          หน้าหลัก (Dashboard)
        </h1>
      </div>

      <div className='grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-2'>
        <Card x-chunk='dashboard-05-chunk-1'>
          <CardHeader className='pb-2'>
            <CardDescription>ผลการนำข้อมูลเข้าล่าสุด</CardDescription>
            <CardTitle className='text-2xl'>
              <span>จำนวน</span> {uploadInfo.latestUpload?.count}{' '}
              <span>รายการ</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='text-xs text-muted-foreground'>
              <span className='font-semibold'>วันที่อัปโหลดล่าสุดคือ:</span>{' '}
              {uploadInfo.latestUpload?.date
                ? uploadInfo.latestUpload?.date
                : 'No uploads yet'}
            </div>
          </CardContent>
        </Card>
        <Card x-chunk='dashboard-05-chunk-1'>
          <CardHeader className='pb-2'>
            <CardDescription>
              จำนวนข้อมูลนำเข้าในเดือน{uploadInfo.monthName}
            </CardDescription>
            <CardTitle className='text-2xl'>
              <span>จำนวน</span> {uploadInfo.monthlyCount} <span>รายการ</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='text-xs text-muted-foreground'>
              <span className='font-semibold'>เมื่อ:</span>{' '}
              {/*      {uploadInfo.latestUploadDate
                ? uploadInfo.latestUploadDate.toLocaleString()
                : 'No uploads yet'} */}
            </div>
          </CardContent>
        </Card>
      </div>
      <div className='mt-2'>
        <Card className='sm:col-span-2' x-chunk='dashboard-05-chunk-0'>
          <CardContent>
            <DataTable columns={columns} data={data} />
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default DashBoardPage;
