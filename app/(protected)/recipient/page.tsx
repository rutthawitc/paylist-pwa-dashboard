import { DataTable } from '@/components/recipienttable/data-table';
import { getAllRecipientData } from '@/lib/recipient-data';
import { columns } from '@/components/recipienttable/columns';
import AddRecipientForm from '@/components/auth/addrecipient-form';

import { auth } from '@/auth';
import { redirect } from 'next/navigation';

const RecipientName = async () => {
  const session = await auth();
  if (
    session?.user?.status !== 'active' ||
    (session?.user?.role !== 'admin' && session?.user?.role !== 'superuser')
  ) {
    redirect('/403');
  }

  const recipientData: any = await getAllRecipientData();
  return (
    <main className='flex flex-1 flex-col gap-4 p-4 lg:gap-2 lg:p-4'>
      <div className='flex items-center'>
        <h1 className='text-xs font-semibold md:text-2xl'>
          ชื่อผู้รับ/ชื่อบริษัท
        </h1>
      </div>
      <div>
        <p className='text-sm text-foreground/50'>
          หน้านี้เพื่อใช้ในการบันทึกชื่อผู้รับที่ยาวเกินกำหนดของระบบ SAP
        </p>
      </div>
      <DataTable columns={columns} data={recipientData} />
      <div
        className='p-4 rounded-lg border border-dashed shadow-sm mt-4'
        x-chunk='dashboard-02-chunk-1'>
        <h3 className='text-xl font-bold tracking-tight pb-2 '>เพิ่มผู้รับ</h3>
        <AddRecipientForm />
      </div>
    </main>
  );
};

export default RecipientName;
