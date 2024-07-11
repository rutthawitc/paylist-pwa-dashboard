import { Button } from '@/components/ui/button';
import Link from 'next/link';
const UserMenuBar = () => {
  return (
    <>
      <div className='ml-auto flex-1 sm:flex-initial'>
        <Link href='/auth/login'>
          <Button variant='outline' size='sm' className='mx-2'>
            สำหรับเจ้าหน้าที่
          </Button>
        </Link>
      </div>
    </>
  );
};

export default UserMenuBar;
