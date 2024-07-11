import { db } from '@/lib/db';

export const getAllRecipientData = async () => {
  try {
    const recipientData = db.companyname.findMany();
    return recipientData;
  } catch (error) {
    console.log('Not Found', error);
    return null;
  }
};

export const getRecipientByName = async (short_name: string) => {
  try {
    const recipient = db.companyname.findFirst({
      where: {
        short_name,
      },
    });
    return recipient;
  } catch (error) {
    console.log('Not Found', error);
    return null;
  }
};
