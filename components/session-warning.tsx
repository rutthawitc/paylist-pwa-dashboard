'use client';

import { useEffect, useRef, useCallback } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';

export function SessionWarning({ timeoutSeconds }: { timeoutSeconds: number }) {
  const { toast } = useToast();
  const router = useRouter();
  
  // สร้าง refs สำหรับ timers เพื่อให้สามารถล้างและตั้งใหม่ได้
  const warningTimerRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutTimerRef = useRef<NodeJS.Timeout | null>(null);

  // ฟังก์ชันสำหรับเริ่มการตรวจสอบ session ใหม่
  const startSessionTimers = useCallback(() => {
    // ล้าง timers เดิมถ้ามี
    if (warningTimerRef.current) {
      clearTimeout(warningTimerRef.current);
    }
    if (timeoutTimerRef.current) {
      clearTimeout(timeoutTimerRef.current);
    }

    const warningTime = (timeoutSeconds - 60) * 1000;
    const timeoutTime = timeoutSeconds * 1000;
    
    // แจ้งเตือนก่อน timeout 1 นาที
    warningTimerRef.current = setTimeout(() => {
      const warningToast = toast({
        title: "แจ้งเตือนการหมดเวลา Session",
        description: "Session จะหมดเวลาในอีก 1 นาที กรุณาบันทึกข้อมูลที่ทำงานอยู่",
        variant: "destructive",
        duration: Infinity, // ทำให้ toast ไม่หายไปอัตโนมัติ
        action: (
          <div className="flex gap-2">
            <Button 
              variant="outline"
              onClick={async () => {
                warningToast.dismiss();
                try {
                  // ต่ออายุ session โดยการเรียก API
                  await fetch('/api/auth/session', { method: 'GET' });
                  toast({
                    title: "ต่ออายุ Session สำเร็จ",
                    description: "Session ได้รับการต่ออายุแล้ว",
                    variant: "default",
                    duration: 3000,
                  });
                  
                  // เริ่มต้นการตรวจสอบอีกครั้ง
                  startSessionTimers();
                } catch (error) {
                  console.error('Session refresh failed:', error);
                  toast({
                    title: "ต่ออายุ Session ไม่สำเร็จ",
                    description: "กรุณาบันทึกข้อมูลและล็อกอินใหม่",
                    variant: "destructive",
                    duration: 3000,
                  });
                }
              }}
            >
              ต่ออายุ Session
            </Button>
            <Button 
              variant="default"
              className="bg-black hover:bg-black/90 text-white"
              onClick={() => warningToast.dismiss()}
            >
              รับทราบ
            </Button>
          </div>
        )
      });
    }, warningTime);

    // logout และ redirect เมื่อ timeout
    timeoutTimerRef.current = setTimeout(async () => {
      await signOut({ redirect: false });
      window.location.href = '/auth/login';
    }, timeoutTime);
  }, [timeoutSeconds, toast]);

  useEffect(() => {
    // เริ่มต้นการตรวจสอบ
    startSessionTimers();

    return () => {
      // ล้าง timers เมื่อ component unmount
      if (warningTimerRef.current) {
        clearTimeout(warningTimerRef.current);
      }
      if (timeoutTimerRef.current) {
        clearTimeout(timeoutTimerRef.current);
      }
    };
  }, [startSessionTimers]);

  return null;
}
