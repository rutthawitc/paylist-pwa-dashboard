import { db } from '@/lib/db';

export const getPayData = async () => {
  try {
    const payData = await db.payList.findMany();
    //console.log(payData);
    return payData;
  } catch (error) {
    console.log(error);
    return [];
  }
};
