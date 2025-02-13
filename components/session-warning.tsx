'use client';

import { useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';

export function SessionWarning({ timeoutSeconds }: { timeoutSeconds: number }) {
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    const warningTime = (timeoutSeconds - 60) * 1000;
    const timeoutTime = timeoutSeconds * 1000;
    
    // แจ้งเตือนก่อน timeout 1 นาที
    const warningTimer = setTimeout(() => {
      const warningToast = toast({
        title: "แจ้งเตือนการหมดเวลา Session",
        description: "Session จะหมดเวลาในอีก 1 นาที กรุณาบันทึกข้อมูลที่ทำงานอยู่",
        variant: "destructive",
        duration: Infinity, // ทำให้ toast ไม่หายไปอัตโนมัติ
        action: (
          <div className="flex gap-2">
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
    const timeoutTimer = setTimeout(async () => {
      await signOut({ redirect: false });
      window.location.href = '/auth/login';
    }, timeoutTime);

    return () => {
      clearTimeout(warningTimer);
      clearTimeout(timeoutTimer);
    };
  }, [timeoutSeconds, toast, router]);

  return null;
}
