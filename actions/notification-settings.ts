'use server';

import { revalidatePath } from 'next/cache';
import { auth } from '@/auth';
import { createAuditLog } from '@/lib/audit-logger';
import { db } from '@/lib/db';

// ใช้ singleton instance ของ PrismaClient จาก lib/db.ts

export interface GetNotificationSettingsParams {
}

// รับรายการการตั้งค่าการแจ้งเตือนทั้งหมด
export async function getNotificationSettings() {
  try {
    const settings = await db.notificationSetting.findMany({
      orderBy: {
        area: 'asc',
      },
    });
    return { success: true, data: settings };
  } catch (error) {
    console.error('Error fetching notification settings:', error);
    return { 
      success: false, 
      error: 'ไม่สามารถดึงข้อมูลการตั้งค่าการแจ้งเตือนได้'
    };
  }
}

// รับการตั้งค่าการแจ้งเตือนตาม ID
export async function getNotificationSettingById(id: string) {
  try {
    const setting = await db.notificationSetting.findUnique({
      where: { id },
    });
    
    if (!setting) {
      return { success: false, error: 'ไม่พบการตั้งค่าการแจ้งเตือนที่ระบุ' };
    }
    
    return { success: true, data: setting };
  } catch (error) {
    console.error('Error fetching notification setting:', error);
    return { 
      success: false, 
      error: 'ไม่สามารถดึงข้อมูลการตั้งค่าการแจ้งเตือนได้'
    };
  }
}

// รับการตั้งค่าการแจ้งเตือนตามพื้นที่
export async function getNotificationSettingByArea(area: string) {
  try {
    const setting = await db.notificationSetting.findUnique({
      where: { area },
    });
    
    if (!setting) {
      return { success: false, error: 'ไม่พบการตั้งค่าการแจ้งเตือนสำหรับพื้นที่นี้' };
    }
    
    return { success: true, data: setting };
  } catch (error) {
    console.error('Error fetching notification setting by area:', error);
    return { 
      success: false, 
      error: 'ไม่สามารถดึงข้อมูลการตั้งค่าการแจ้งเตือนได้'
    };
  }
}

// สร้างการตั้งค่าการแจ้งเตือนใหม่
interface CreateNotificationSettingParams {
  area: string;
  userArea?: string;
  divName?: string;
  depName?: string;
  description?: string;
  lineToken?: string;
  telegramBotToken?: string;
  telegramChatId?: string;
  isActive?: boolean;
  userId?: string;
}

export async function createNotificationSetting(params: CreateNotificationSettingParams) {
  const {
    area,
    userArea,
    divName,
    depName,
    description,
    lineToken,
    telegramBotToken,
    telegramChatId,
    isActive = true,
    userId,
  } = params;

  try {
    // ตรวจสอบว่าพื้นที่นี้มีอยู่แล้วหรือไม่
    const existingSetting = await db.notificationSetting.findUnique({
      where: { area },
    });

    if (existingSetting) {
      return {
        success: false,
        error: `พื้นที่ "${area}" มีการตั้งค่าอยู่แล้ว`,
      };
    }

    const newSetting = await db.notificationSetting.create({
      data: {
        area,
        userArea,
        divName,
        depName,
        description,
        lineToken,
        telegramBotToken,
        telegramChatId,
        isActive,
        createdBy: userId,
        updatedBy: userId,
      },
    });

    // สร้าง audit log
    if (userId) {
      await createAuditLog({
        userId,
        action: 'CREATE',
        resource: 'PayList',
        details: {
          type: 'NOTIFICATION_SETTING',
          area,
          description,
          isActive,
        },
      });
    }

    revalidatePath('/notifications');
    
    return {
      success: true,
      data: newSetting,
      message: `เพิ่มการตั้งค่าการแจ้งเตือนสำหรับพื้นที่ "${area}" เรียบร้อยแล้ว`,
    };
  } catch (error) {
    console.error('Error creating notification setting:', error);
    return {
      success: false,
      error: 'ไม่สามารถสร้างการตั้งค่าการแจ้งเตือนได้',
    };
  }
}

// อัปเดตการตั้งค่าการแจ้งเตือน
interface UpdateNotificationSettingParams {
  id: string;
  area?: string;
  userArea?: string;
  divName?: string;
  depName?: string;
  description?: string;
  lineToken?: string;
  telegramBotToken?: string;
  telegramChatId?: string;
  isActive?: boolean;
  userId?: string;
}

export async function updateNotificationSetting(params: UpdateNotificationSettingParams) {
  const {
    id,
    area,
    userArea,
    divName,
    depName,
    description,
    lineToken,
    telegramBotToken,
    telegramChatId,
    isActive,
    userId,
  } = params;

  try {
    // ตรวจสอบว่ามีการตั้งค่านี้อยู่หรือไม่
    const existingSetting = await db.notificationSetting.findUnique({
      where: { id },
    });

    if (!existingSetting) {
      return {
        success: false,
        error: 'ไม่พบการตั้งค่าการแจ้งเตือนที่ระบุ',
      };
    }

    // ถ้ามีการเปลี่ยนแปลงพื้นที่ ให้ตรวจสอบว่าชื่อพื้นที่ใหม่มีอยู่แล้วหรือไม่
    if (area && area !== existingSetting.area) {
      const duplicateArea = await db.notificationSetting.findUnique({
        where: { area },
      });

      if (duplicateArea) {
        return {
          success: false,
          error: `พื้นที่ "${area}" มีการตั้งค่าอยู่แล้ว`,
        };
      }
    }

    // สร้างข้อมูลสำหรับอัปเดต
    const updateData: any = {
      updatedBy: userId,
    };

    // เพิ่มเฉพาะฟิลด์ที่มีการส่งค่ามาเท่านั้น
    if (area !== undefined) updateData.area = area;
    if (userArea !== undefined) updateData.userArea = userArea;
    if (divName !== undefined) updateData.divName = divName;
    if (depName !== undefined) updateData.depName = depName;
    if (description !== undefined) updateData.description = description;
    if (lineToken !== undefined) updateData.lineToken = lineToken;
    if (telegramBotToken !== undefined) updateData.telegramBotToken = telegramBotToken;
    if (telegramChatId !== undefined) updateData.telegramChatId = telegramChatId;
    if (isActive !== undefined) updateData.isActive = isActive;

    // อัปเดตการตั้งค่า
    const updatedSetting = await db.notificationSetting.update({
      where: { id },
      data: updateData,
    });

    // สร้าง audit log
    if (userId) {
      await createAuditLog({
        userId,
        action: 'UPDATE',
        resource: 'PayList',
        details: {
          type: 'NOTIFICATION_SETTING',
          id,
          area: area ?? existingSetting.area,
          changes: {
            description: description !== undefined,
            lineToken: lineToken !== undefined,
            telegramBotToken: telegramBotToken !== undefined,
            telegramChatId: telegramChatId !== undefined,
            isActive: isActive !== undefined,
          },
        },
      });
    }

    revalidatePath('/notifications');
    
    return {
      success: true,
      data: updatedSetting,
      message: `อัปเดตการตั้งค่าการแจ้งเตือนสำหรับพื้นที่ "${updatedSetting.area}" เรียบร้อยแล้ว`,
    };
  } catch (error) {
    console.error('Error updating notification setting:', error);
    return {
      success: false,
      error: 'ไม่สามารถอัปเดตการตั้งค่าการแจ้งเตือนได้',
    };
  }
}

// ลบการตั้งค่าการแจ้งเตือน
export async function deleteNotificationSetting(id: string, userId?: string) {
  try {
    // ตรวจสอบว่ามีการตั้งค่านี้อยู่หรือไม่
    const existingSetting = await db.notificationSetting.findUnique({
      where: { id },
    });

    if (!existingSetting) {
      return {
        success: false,
        error: 'ไม่พบการตั้งค่าการแจ้งเตือนที่ระบุ',
      };
    }

    // ลบการตั้งค่า
    await db.notificationSetting.delete({
      where: { id },
    });

    // สร้าง audit log
    if (userId) {
      await createAuditLog({
        userId,
        action: 'DELETE',
        resource: 'PayList',
        details: {
          type: 'NOTIFICATION_SETTING',
          id,
          area: existingSetting.area,
        },
      });
    }

    revalidatePath('/notifications');
    
    return {
      success: true,
      message: `ลบการตั้งค่าการแจ้งเตือนสำหรับพื้นที่ "${existingSetting.area}" เรียบร้อยแล้ว`,
    };
  } catch (error) {
    console.error('Error deleting notification setting:', error);
    return {
      success: false,
      error: 'ไม่สามารถลบการตั้งค่าการแจ้งเตือนได้',
    };
  }
}
