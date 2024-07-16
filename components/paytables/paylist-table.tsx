import { DataTable } from '@/components/paytables/data-table';
import { columns } from '@/components/paytables/columns';

import { getPayData } from '@/lib/data';

const PaylistTable = async () => {
  // เพิ่ม cache: 'no-store' option เพื่อป้องกันการ cache ข้อมูล
  const data: any = await getPayData({ cache: 'no-store' });
  console.log(data.length);

  return (
    <>
      <DataTable columns={columns} data={data} />
    </>
  );
};

export default PaylistTable;
