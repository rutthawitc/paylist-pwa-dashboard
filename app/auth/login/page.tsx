'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { z } from 'zod';

import { LoginForm } from '@/components/auth/login-form';
import { LoginSchema } from '@/schemas';

const LoginPage = () => {
  const router = useRouter();
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");
    
    try {
      const result = await signIn("credentials", {
        username: values.username,
        pwd: values.pwd,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid credentials!");
        return;
      }

      const response = await fetch("/auth/login");
      
      router.push("/dashboard");
      router.refresh();
    } catch (error) {
      setError("Something went wrong!");
    }
  };

  return <LoginForm onSubmit={onSubmit} />;
};

export default LoginPage;
