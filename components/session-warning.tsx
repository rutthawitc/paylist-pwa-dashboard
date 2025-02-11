"use client";

import { useEffect } from 'react';

export function SessionWarning({ timeoutSeconds }: { timeoutSeconds: number }) {
  useEffect(() => {
    const warningTime = (timeoutSeconds - 60) * 1000;
    
    const timer = setTimeout(() => {
      if (confirm('Session expires in 1 minute. Renew session?')) {
        fetch('/api/auth/session', { method: 'PUT' })
          .then(() => window.location.reload())
          .catch(console.error);
      }
    }, warningTime);

    return () => clearTimeout(timer);
  }, [timeoutSeconds]);

  return null;
}
