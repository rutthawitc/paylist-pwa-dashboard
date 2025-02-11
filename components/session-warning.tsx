'use client';

import { useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export function SessionWarning({ timeoutSeconds }: { timeoutSeconds: number }) {
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    const warningTime = (timeoutSeconds - 60) * 1000;
    const timeoutTime = timeoutSeconds * 1000;

    // แจ้งเตือนก่อน timeout 1 นาที
    const warningTimer = setTimeout(() => {
      toast({
        title: 'แจ้งเตือนการหมดเวลา Session',
        description: 'Session จะหมดเวลาในอีก 1 นาที',
        variant: 'destructive',
        action: (
          <Button
            variant='default'
            className='bg-black hover:bg-black/90 text-white'
            onClick={() => {
              fetch('/api/auth/session', { method: 'PUT' })
                .then(() => window.location.reload())
                .catch(console.error);
            }}>
            ต่ออายุ Session
          </Button>
        ),
      });
    }, warningTime);

    // redirect เมื่อ timeout
    const timeoutTimer = setTimeout(() => {
      router.push('/auth/login');
    }, timeoutTime);

    return () => {
      clearTimeout(warningTimer);
      clearTimeout(timeoutTimer);
    };
  }, [timeoutSeconds, toast, router]);

  return null;
}
