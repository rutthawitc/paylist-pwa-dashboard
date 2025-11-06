import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import HtmlUploadForm from '@/components/html-upload';

const HtmlUploadPage = async () => {
  const session = await auth();

  if (
    session?.user?.status !== 'active' ||
    (session?.user?.role !== 'admin' && session?.user?.role !== 'superuser')
  ) {
    redirect('/403');
  }

  return (
    <main className='flex flex-1 flex-col gap-4 p-4 lg:gap-2 lg:p-4'>
      <div className='flex items-center'>
        <h1 className='text-xs font-semibold md:text-2xl'>
          นำเข้าไฟล์ HTML รายงานการจ่ายเงิน (Export จากระบบ SAP)
        </h1>
      </div>
      <div className='text-sm text-gray-600 mb-2'>
        <p>
          อัปโหลดไฟล์ HTML จากระบบรายงานการจ่ายเงิน (Paylist.htm)
          เพื่อแปลงข้อมูลและนำเข้าสู่ระบบ
        </p>
      </div>
      <HtmlUploadForm />
    </main>
  );
};

export default HtmlUploadPage;
