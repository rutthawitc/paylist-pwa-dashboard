'use client';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { LoginSchema } from '@/schemas';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { FormError } from '@/components/form-error';
import { FormSuccess } from '@/components/form-success';
import { login } from '@/actions/login';
import { useState, useTransition } from 'react';
import { BackButton } from './back-button';

export function LoginForm() {
  const logoutUrl = process.env.LOGOUT_URL;
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      username: '',
      pwd: '',
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError('');
    setSuccess('');
    startTransition(() =>
      login(values).then((data) => {
        if (data) {
          setError(data.error);
          setSuccess(data.success);
        }
      })
    );
  };

  return (
    <Card className='w-full max-w-sm'>
      <CardHeader>
        <CardTitle className='text-2xl'>Login 🔐</CardTitle>

        <CardDescription>
          ใช้รหัสพนักงานและพาสเวิร์ดของคุณเพื่อเข้าสู่ระบบ.
        </CardDescription>
      </CardHeader>
      <CardContent className='grid gap-4'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            <div className='space-y-4'>
              <FormField
                control={form.control}
                name='username'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>รหัสพนักงาน</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='รหัสพนักงาน'
                        {...field}
                        type='text'
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='pwd'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>รหัสผ่าน</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='*******'
                        {...field}
                        type='password'
                        autoComplete='current-password webauthn'
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormError message={error || ''} />
            <FormSuccess message={success || ''} />
            <Button className='w-full' type='submit' disabled={isPending}>
              เข้าสู่ระบบ
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <BackButton href={logoutUrl || ''} label='Back' />
      </CardFooter>
    </Card>
  );
}
