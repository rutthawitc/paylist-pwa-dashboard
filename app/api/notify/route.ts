import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { createAuditLog } from '@/lib/audit-logger';
import axios, { AxiosResponse } from 'axios';

export async function POST(request: NextRequest): Promise<NextResponse> {
  const body: { 
    message: string; 
    area?: string; 
    userId?: string;
    userArea?: string;
    divName?: string;
    depName?: string;
    includeAreaDetails?: boolean;
  } = await request.json();
  
  const url: string = 'https://notify-api.line.me/api/notify';
  let message: string = body.message;
  const area: string | undefined = body.area;
  const userId: string | undefined = body.userId;
  const userArea: string | undefined = body.userArea;
  const divName: string | undefined = body.divName;
  const depName: string | undefined = body.depName;
  const includeAreaDetails: boolean = body.includeAreaDetails || false;

  console.log(`[LineNotify] Parameters received - divName: "${divName}", depName: "${depName}"`);

  try {
    // ถ้ามีการระบุพื้นที่ ให้ใช้ token ของพื้นที่นั้น
    let token: string | undefined | null = process.env.LINE_NOTIFY_TOKEN;

    // ค้นหาการตั้งค่าแบบยืดหยุ่นขึ้น - หาตาม userArea ถ้ามี
    console.log(`[LineNotify] Looking for area settings with userArea: ${userArea || 'not specified'}`);
    
    let areaSetting: NotificationSetting | null = null;
    
    // ค้นหาข้อมูลการตั้งค่าการแจ้งเตือนจาก DB
    if (userArea) {
      // หากมี userArea ให้ค้นหาโดยใช้ userArea ก่อน
      areaSetting = await db.notificationSetting.findFirst({
        where: {
          userArea: userArea,
          isActive: true,
        }
      });
      
      if (areaSetting) {
        console.log(`[LineNotify] Found area settings using userArea: ${userArea} (${areaSetting.area})`);
      } else {
        console.log(`[LineNotify] No settings found for userArea: ${userArea}`);
        // ค้นหาด้วยตัวเลือกอื่น - เอาอันไหนก็ได้ที่ active
        areaSetting = await db.notificationSetting.findFirst({
          where: {
            isActive: true,
          },
          orderBy: {
            createdAt: 'desc' // เอาอันล่าสุดก่อน
          }
        });
        
        if (areaSetting) {
          console.log(`[LineNotify] Using fallback setting: ${areaSetting.area}`);
        }
      }
    } else {
      // ถ้าไม่มี userArea ให้ค้นหาข้อมูลล่าสุดที่ active
      console.log(`[LineNotify] No userArea provided, trying to find any active setting`);
      areaSetting = await db.notificationSetting.findFirst({
        where: {
          isActive: true,
        },
        orderBy: {
          createdAt: 'desc' // เอาอันล่าสุดก่อน
        }
      });
      
      if (areaSetting) {
        console.log(`[LineNotify] Found fallback setting: ${areaSetting.area}`);
      }
    }

    if (areaSetting?.lineToken) {
      token = areaSetting.lineToken;
      console.log(`[LineNotify] Using area-specific token from database for area: ${areaSetting.area}`);
      console.log(`[LineNotify] Token length: ${token.length}`);
      
      // เพิ่ม area และ divName ในข้อความถ้าต้องการ
      if (includeAreaDetails) {
        // สร้างข้อความที่แสดงข้อมูลพื้นที่
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
        
        console.log(`[LineNotify] Combined area info: "${areaInfo}"`);

        // ปรับปรุงให้แสดงข้อความตรงตามรูปแบบ "แจ้งเตือนการจ่ายเงิน" "จาก" "[ข้อมูลพื้นที่]"
        // ตรวจสอบว่าข้อความมีคำว่า "แจ้งเตือนการจ่ายเงิน" อยู่แล้วหรือไม่
        if (message.startsWith("แจ้งเตือนการจ่ายเงิน")) {
          // ตัดคำว่า "แจ้งเตือนการจ่ายเงิน" ออกแล้วเพิ่มรูปแบบใหม่
          message = `แจ้งเตือนการจ่ายเงินจาก ${areaInfo}${message.substring("แจ้งเตือนการจ่ายเงิน".length)}`;
        } else {
          message = `แจ้งเตือนการจ่ายเงินจาก ${areaInfo} ${message}`;
        }
        console.log(`[LineNotify] Enhanced message with area details: ${areaInfo}`);
        console.log(`[LineNotify] Final message: ${message}`);
      } else {
        console.log(`[LineNotify] Using basic message without area details`);
      }
    } else {
      // ถ้าไม่พบข้อมูลใน DB จึงค่อยใช้ค่าจาก .env
      token = process.env.LINE_NOTIFY_TOKEN;
      console.log(`[LineNotify] Using fallback token from .env`);
      console.log(`[LineNotify] Token from .env length: ${token?.length || 0}`);
    }

    if (!token) {
      return NextResponse.json(
        { error: 'LINE_NOTIFY_TOKEN is not set' },
        { status: 500 }
      );
    }

    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${token}`,
      },
    };
    
    // เพิ่ม URL ถ้ายังไม่มีในข้อความ
    const appBaseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://110.76.155.100:10002';
    
    // ตรวจสอบว่ามี URL อยู่แล้วหรือไม่
    if (!message.includes(appBaseUrl)) {
      message += `\n\nกรุณาตรวจสอบในระบบ ${appBaseUrl}`;
    }
    
    console.log(`[LineNotify] Message content final: ${message}`);
    
    // เตรียมส่งการแจ้งเตือน
    const data: string = `message=${encodeURIComponent(message)}`;

    console.log(`[LineNotify] Sending message to Line Notify`);
    console.log(`[LineNotify] Message sent: ${message}`);
    console.log(`[LineNotify] Token length: ${token.length} characters`);

    const response: AxiosResponse = await axios.post(url, data, config);
    
    // บันทึก audit log ถ้ามี userId
    if (userId) {
      await createAuditLog({
        userId,
        action: 'NOTIFY',
        resource: 'PayList',
        details: {
          type: 'LINE',
          messageLength: message.length,
          area: area || 'default',
        },
      });
    }
    
    return NextResponse.json({ 
      success: true,
      message: 'ส่งข้อความผ่าน Line Notify สำเร็จ',
      area: area || 'default' 
    });
  } catch (error) {
    console.error('Error sending Line notification:', error);
    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        { 
          success: false,
          error: error.message 
        },
        { status: error.response?.status || 500 }
      );
    }
    return NextResponse.json(
      { 
        success: false,
        error: 'เกิดข้อผิดพลาดที่ไม่คาดคิด' 
      },
      { status: 500 }
    );
  }
}
