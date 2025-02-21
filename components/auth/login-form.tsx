'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { LoginSchema } from '@/schemas';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Lock } from 'lucide-react';

interface LoginFormProps {
  onSubmit: (values: z.infer<typeof LoginSchema>) => Promise<void>;
}

export const LoginForm = ({ onSubmit }: LoginFormProps) => {
  const [isPending, setIsPending] = useState(false);

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      username: '',
      pwd: '',
    },
  });

  const handleSubmit = async (values: z.infer<typeof LoginSchema>) => {
    try {
      setIsPending(true);
      await onSubmit(values);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Form {...form}>
      <div className='flex flex-col items-center max-w-sm mx-auto'>
        <div className='text-center w-full mb-2'>
          <h1 className='text-2xl font-normal inline-flex items-center gap-2 mb-1'>
            Login <Lock className='w-5 h-5 text-yellow-500' />
          </h1>
          <p className='text-grey-800 text-sm'>
            ใช้รหัสพนักงานและพาสเวิร์ดของคุณเพื่อเข้าสู่ระบบ
          </p>
        </div>

        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className='w-full space-y-4 mt-8'>
          <FormField
            control={form.control}
            name='username'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-sm font-normal'>
                  รหัสพนักงาน
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    placeholder='รหัสพนักงาน'
                    type='text'
                    className='bg-white'
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
                <FormLabel className='text-sm font-normal'>รหัสผ่าน</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    placeholder='*******'
                    type='password'
                    className='bg-white'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type='submit'
            className='w-full bg-[#14182E] hover:bg-[#14182E]/90 text-white mt-4'
            disabled={isPending}>
            {isPending ? 'กำลังโหลด...' : 'เข้าสู่ระบบ'}
          </Button>

          <div className='text-center mt-4'>
            <Button
              type='button'
              variant='link'
              className='text-gray-800 text-sm font-normal'
              onClick={() => window.history.back()}>
              Back
            </Button>
          </div>
        </form>
      </div>
    </Form>
  );
};
