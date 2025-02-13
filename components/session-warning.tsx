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
      toast({
        title: "แจ้งเตือนการหมดเวลา Session",
        description: "Session จะหมดเวลาในอีก 1 นาที",
        variant: "destructive",
        action: (
          <Button 
            variant="default"
            className="bg-black hover:bg-black/90 text-white"
            onClick={async () => {
              try {
                const response = await fetch('/api/auth/session', { method: 'PUT' });
                if (response.ok) {
                  window.location.reload();
                } else {
                  throw new Error('Failed to renew session');
                }
              } catch (error) {
                console.error('Session renewal failed:', error);
                await signOut({ redirect: false });
                router.push('/auth/login');
              }
            }}
          >
            ต่ออายุ Session
          </Button>
        )
      });
    }, warningTime);

    // logout และ redirect เมื่อ timeout
    const timeoutTimer = setTimeout(async () => {
      await signOut({ redirect: false });
      router.push('/auth/login');
    }, timeoutTime);

    return () => {
      clearTimeout(warningTimer);
      clearTimeout(timeoutTimer);
    };
  }, [timeoutSeconds, toast, router]);

  return null;
}
