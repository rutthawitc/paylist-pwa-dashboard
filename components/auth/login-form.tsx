'use client';
import { Suspense } from 'react';
import { LoginFormContent } from '@/components/auth/login-form-content';

export function LoginForm() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginFormContent />
    </Suspense>
  );
}
