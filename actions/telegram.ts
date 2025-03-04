'use server';

import { revalidatePath } from 'next/cache';
import { NotificationSetting } from '@prisma/client';
import { createAuditLog } from '@/lib/audit-logger';
import { db } from '@/lib/db';
import axios from 'axios';

// ใช้ singleton instance ของ PrismaClient จาก lib/db.ts
const prisma = db;

export interface SendTelegramParams {
  message: string;
  userId?: string;
  area?: string;
  userArea?: string;
  includeAreaDetails?: boolean;
  divName?: string;
  depName?: string;
}

/**
 * Sends a notification via Telegram Bot API
 * @param params - The parameters for the notification
 * @param params.message - The message to be sent
 * @param params.userId - Optional user ID for audit logging
 * @param params.area - Optional area for area-specific tokens
 * @param params.userArea - Optional userArea for matching with notificationSetting.userArea
 * @param params.includeAreaDetails - Whether to include area details in message
 * @param params.divName - Optional division name
 * @param params.depName - Optional department name
 * @returns Object containing success status and message
 */
export async function sendTelegramNotification(params: SendTelegramParams) {
  const { 
    message, 
    userId, 
    area = "default",
    userArea,
    includeAreaDetails = true,
    divName: rawDivName,
    depName: rawDepName
  } = params;

  // ตรวจสอบและตั้งค่า default ให้เป็น string ว่างแทนที่จะเป็น undefined
  const divName = rawDivName !== undefined ? rawDivName : '';
  const depName = rawDepName !== undefined ? rawDepName : '';

  try {
    console.log(`[Telegram] Attempting to send message with userArea: ${userArea || 'not specified'}`);
    console.log(`[Telegram] Parameters received - divName: "${divName}", depName: "${depName}"`);
    
    // ตั้งค่า default ให้เป็น string ว่างแทนที่จะเป็น null
    let botToken: string = '';
    let chatId: string = '';
    let finalMessage: string = message;
    
    // ค้นหาข้อมูลการตั้งค่าการแจ้งเตือน
    console.log(`[Telegram] Looking for area settings with userArea: ${userArea || 'not specified'}`);
    
    let areaSetting: NotificationSetting | null = null;
    
    // ค้นหาข้อมูลการตั้งค่าการแจ้งเตือนจาก DB
    if (userArea) {
      // หากมี userArea ให้ค้นหาโดยใช้ userArea ก่อน
      areaSetting = await prisma.notificationSetting.findFirst({
        where: {
          userArea: userArea,
          isActive: true,
        }
      });
      
      if (areaSetting) {
        console.log(`[Telegram] Found area settings using userArea: ${userArea} (${areaSetting.area})`);
      } else {
        console.log(`[Telegram] No settings found for userArea: ${userArea}`);
        // ค้นหาด้วยตัวเลือกอื่น - โดยใช้ area เป็น fallback
        areaSetting = await prisma.notificationSetting.findFirst({
          where: {
            isActive: true,
          },
          orderBy: {
            createdAt: 'desc' // เอาอันล่าสุดก่อน
          }
        });
        
        if (areaSetting) {
          console.log(`[Telegram] Using fallback setting: ${areaSetting.area}`);
        }
      }
    } else {
      // ถ้าไม่มี userArea ให้ค้นหาข้อมูลล่าสุดที่ active
      console.log(`[Telegram] No userArea provided, trying to find any active setting`);
      areaSetting = await prisma.notificationSetting.findFirst({
        where: {
          isActive: true,
        },
        orderBy: {
          createdAt: 'desc' // เอาอันล่าสุดก่อน
        }
      });
      
      if (areaSetting) {
        console.log(`[Telegram] Found fallback setting: ${areaSetting.area}`);
      }
    }
    
    console.log(`[Telegram] Area settings found:`, areaSetting ? `Yes (${areaSetting.area})` : 'No');
    
    // ถ้าพบค่า areaSetting ให้ดึงค่า token จาก DB
    if (areaSetting) {
      // ดึงข้อมูล token จาก DB
      if (areaSetting.telegramBotToken) {
        botToken = areaSetting.telegramBotToken;
      }
      
      if (areaSetting.telegramChatId) {
        chatId = areaSetting.telegramChatId;
      }
      
      // สร้างข้อความพร้อมข้อมูลพื้นที่ ถ้าต้องการให้แสดงข้อมูลพื้นที่
      if (includeAreaDetails && areaSetting.area) {
        // ปรับปรุงข้อความให้มีคำว่า "จาก" และรวมข้อมูลพื้นที่ทั้งหมด
        let areaInfo = `${areaSetting.area}`;
        
        // เพิ่มข้อมูลจาก areaSetting ถ้ามี
        if (areaSetting.divName && areaSetting.divName.trim()) {
          areaInfo += ` ${areaSetting.divName.trim()}`;
        }
        
        if (areaSetting.depName && areaSetting.depName.trim()) {
          areaInfo += ` ${areaSetting.depName.trim()}`;
        }
        
        // ใส่ข้อมูลจาก parameters (จาก session) หากมีและไม่ซ้ำกับข้อมูลที่มีอยู่แล้ว
        if (divName && divName.trim() && !areaInfo.includes(divName.trim())) {
          areaInfo += ` ${divName.trim()}`;
        }
        
        if (depName && depName.trim() && !areaInfo.includes(depName.trim())) {
          areaInfo += ` ${depName.trim()}`;
        }
        
        console.log(`[Telegram] Combined area info: "${areaInfo}"`);
        
        // ตรวจสอบว่าข้อความมีคำว่า "แจ้งเตือนการจ่ายเงิน" อยู่แล้วหรือไม่
        if (message.startsWith("แจ้งเตือนการจ่ายเงิน")) {
          // ตัดคำว่า "แจ้งเตือนการจ่ายเงิน" ออกแล้วเพิ่มรูปแบบใหม่
          finalMessage = `แจ้งเตือนการจ่ายเงินจาก ${areaInfo}${message.substring("แจ้งเตือนการจ่ายเงิน".length)}`;
        } else {
          finalMessage = `แจ้งเตือนการจ่ายเงินจาก ${areaInfo} ${message}`;
        }
        
        console.log(`[Telegram] Enhanced message with area details: ${areaInfo}`);
      }
    }
    
    // ตรวจสอบว่ามี token ครบหรือไม่
    if (!botToken || !chatId) {
      console.log(`[Telegram] Missing token configuration in database. Bot Token: ${botToken ? 'Yes' : 'No'}, Chat ID: ${chatId ? 'Yes' : 'No'}`);
      
      return {
        success: false,
        message: 'ไม่พบข้อมูลการตั้งค่า Telegram ในฐานข้อมูล กรุณาตั้งค่าการแจ้งเตือนก่อน'
      };
    }

    // เพิ่ม URL สำหรับตรวจสอบในระบบ (เฉพาะเมื่อยังไม่มีในข้อความ)
    const appBaseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://110.76.155.100:10002';
    
    // ตรวจสอบว่ามี URL อยู่แล้วหรือไม่
    if (!finalMessage.includes(appBaseUrl)) {
      finalMessage += `\n\nกรุณาตรวจสอบในระบบ ${appBaseUrl}`;
    }
    
    console.log(`[Telegram] Final message to be sent: ${finalMessage}`);
    console.log(`[Telegram] Final message length: ${finalMessage.length} characters`);
    console.log(`[Telegram] Using chat ID: ${chatId}`);
    console.log(`[Telegram] Bot token format valid: ${botToken.includes(':')}`);
    
    // ตรวจสอบความถูกต้องของ token ก่อนส่ง
    if (!botToken.includes(':') || botToken.length < 30) {
      console.log(`[Telegram] Invalid bot token format: ${botToken}`);
      return {
        success: false,
        message: 'รูปแบบ Bot Token ไม่ถูกต้อง กรุณาตรวจสอบการตั้งค่า'
      };
    }

    // ตรวจสอบความถูกต้องของ chat ID ก่อนส่ง
    if (!chatId.match(/^-?\d+$/)) {
      console.log(`[Telegram] Invalid chat ID format: ${chatId}`);
      return {
        success: false,
        message: 'รูปแบบ Chat ID ไม่ถูกต้อง กรุณาตรวจสอบการตั้งค่า'
      };
    }

    // แสดงข้อมูลที่จะใช้ส่ง
    console.log(`[Telegram] Sending message:
      - Bot Token: ${botToken.substring(0, 10)}...${botToken.substring(botToken.length - 5)}
      - Chat ID: ${chatId}
      - Message: ${finalMessage.substring(0, 30)}...${finalMessage.length > 30 ? '' : finalMessage.substring(30)}
    `);

    // Construct the telegram API URL
    const telegramApiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
    
    console.log(`[Telegram] Final message to be sent: ${finalMessage}`);
    
    try {
      // ส่งข้อความ HTTP POST ไปยัง Telegram API
      const response = await axios.post(telegramApiUrl, {
        chat_id: chatId,
        text: finalMessage,
        // ไม่ต้องระบุ parse_mode เพราะไม่ได้ใช้ formatting แบบ HTML หรือ Markdown
      });
      
      // ตรวจสอบ response จาก Telegram
      if (response.status === 200 && response.data && response.data.ok) {
        console.log(`[Telegram] Message sent successfully with response: ${JSON.stringify(response.data)}`);
        console.log(`[Telegram] Full message sent: ${finalMessage}`);
        
        return {
          success: true,
          message: 'Message sent successfully to Telegram',
        };
      } else {
        console.log(`[Telegram] Unexpected response from Telegram API:`, response.data);
        return {
          success: false,
          message: `ไม่สามารถส่งข้อความได้: ${response.data?.description || 'Unknown error'}`
        };
      }
    } catch (error: any) {
      // จัดการกับข้อผิดพลาดที่อาจเกิดขึ้น
      console.error('[Telegram] Error sending message to Telegram:', error);
      console.error('[Telegram] Error details:', error.response?.data?.description || error.message || 'Unknown error');
      
      // กรณีที่เป็น error จาก Telegram API (มี response)
      if (error.response && error.response.data) {
        const telegramError = error.response.data?.description || 'Unknown Telegram error';
        console.log(`[Telegram] Telegram API error: ${telegramError}`);
        
        return {
          success: false,
          message: `ไม่สามารถส่งข้อความไปยัง Telegram: ${telegramError}`
        };
      }
      
      // กรณี network error หรือ timeout
      if (error.code === 'ENOTFOUND' || error.code === 'ETIMEDOUT') {
        return {
          success: false,
          message: 'ไม่สามารถเชื่อมต่อกับ Telegram API ได้ กรุณาตรวจสอบการเชื่อมต่ออินเทอร์เน็ต'
        };
      }
      
      return {
        success: false,
        message: `ข้อผิดพลาดในการส่งข้อความ: ${error.message || 'Unknown error'}`
      };
    }

    // Create audit log for this notification
    if (userId) {
      await createAuditLog({
        userId: userId!, // ใช้ non-null assertion operator (!) เพื่อบอก TypeScript ว่าไม่เป็น undefined แน่นอน
        action: 'NOTIFY',
        resource: 'PayList',
        details: {
          type: 'TELEGRAM',
          messageLength: message.length,
          area: area || 'default',
        },
      });
      console.log(`[Telegram] Created audit log for user ${userId}`);
    }

    revalidatePath('/notifications');
    
    return { 
      success: true,
      message: 'ส่งข้อความผ่าน Telegram สำเร็จ',
    };
    
  } catch (error: any) {
    console.error('[Telegram] Error in sendTelegramNotification:', error);
    
    // ส่งข้อความที่ชัดเจนเพื่อการแก้ไขปัญหา
    let errorMessage = 'เกิดข้อผิดพลาดในการส่งข้อความไปยัง Telegram';
    
    if (error.message && error.message.includes('chat not found')) {
      errorMessage = 'ไม่พบ Chat ID ที่ระบุ กรุณาตรวจสอบ Telegram Chat ID ในการตั้งค่า';
    } else if (error.message && error.message.includes('Not Found')) {
      errorMessage = 'ไม่พบ Bot Token ที่ระบุ กรุณาตรวจสอบ Telegram Bot Token ในการตั้งค่า';
    } else if (error.message) {
      errorMessage += ': ' + error.message;
    }
    
    return {
      success: false,
      message: errorMessage
    };
  }
}
