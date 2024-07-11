import { db } from './db';

export const getAllUsers = async () => {
  try {
    const users = db.users.findMany();
    return users;
  } catch (error) {
    console.log('Not Found', error);
    return null;
  }
};
export const getUserbyName = async (name: string) => {
  try {
    const user = db.users.findFirst({
      where: {
        name,
      },
    });
    return user;
  } catch (error) {
    console.log('Not Found', error);
    return null;
  }
};

export const getUserRole = async (name: string) => {
  try {
    const user = await db.users.findFirst({
      where: {
        name,
      },
    });

    // ถ้าไม่พบ user ใน db ให้ return role เป็น 'user'
    if (!user) {
      return 'user';
    }

    const userRole = await db.users.findUnique({
      where: {
        id: user.id,
      },
      select: {
        role: true,
      },
    });

    // ตรวจสอบ Role
    if (userRole?.role === null || userRole?.role === undefined) {
      return 'user';
    } else {
      return userRole.role; // จะเป็น 'admin' หรือ 'user' ตามที่มีในฐานข้อมูล
    }
  } catch (error) {
    console.log('Not Found', error);
    return 'user'; // เปลี่ยนจาก null เป็น 'user' ในกรณีที่เกิด error
  }
};

export const getUserStatus = async (name: string) => {
  try {
    const user = await db.users.findFirst({
      where: {
        name,
      },
    });
    return user?.status;
  } catch (error) {
    console.log('Not Found', error);
    return null;
  }
};
