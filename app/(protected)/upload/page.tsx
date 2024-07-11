import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import XlsUploadForm from '@/components/xls-upload';
const UploadPage = async () => {
  const session = await auth();
  //console.log(session);
  if (session?.user?.status !== 'active') {
    redirect('/403');
  }
  return (
    <main className='flex flex-1 flex-col gap-4 p-4 lg:gap-2 lg:p-4'>
      <div className='flex items-center'>
        <h1 className='text-xs font-semibold md:text-2xl'>นำเข้าไฟล์ข้อมูล</h1>
      </div>
      <XlsUploadForm />
      {/* <div>Table Section</div> */}
    </main>
  );
};

export default UploadPage;
