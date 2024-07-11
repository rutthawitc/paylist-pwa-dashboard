'use client';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { AddUserSchema } from '@/schemas';

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { FormError } from '@/components/form-error';
import { FormSuccess } from '@/components/form-success';
import { useState, useTransition } from 'react';
import { adduser } from '@/actions/adduser';

export function AddUserForm() {
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof AddUserSchema>>({
    resolver: zodResolver(AddUserSchema),
    defaultValues: {
      name: '',
      role: 'user',
      status: 'active',
    },
  });

  const onSubmit = (values: z.infer<typeof AddUserSchema>) => {
    setError('');
    setSuccess('');
    startTransition(() =>
      adduser(values).then((data) => {
        setError(data.error);
        setSuccess(data.success);
      })
    );
  };

  return (
    <Card className='w-full max-w-sm'>
      <CardHeader>
        <CardTitle className='text-2xl'>Add User 🔐</CardTitle>

        <CardDescription>
          ป้อนรหัสพนักงานและเลือกสิทธิ์ของพนักงาน
        </CardDescription>
      </CardHeader>
      <CardContent className='grid gap-4'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            <div className='space-y-4'>
              <FormField
                control={form.control}
                name='name'
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
                name='role'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>สิทธิ์</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value || 'user'}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder='Select a verified email to display' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value='user'>User</SelectItem>
                          <SelectItem value='superuser'>Super User</SelectItem>
                          <SelectItem value='admin'>Admin</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='status'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>สถานะ</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value || 'active'}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder='User Status' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value='active'>Active</SelectItem>
                          <SelectItem value='inactive'>Inactive</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormError message={error || ''} />
            <FormSuccess message={success || ''} />
            <Button className='w-full' type='submit' disabled={isPending}>
              เพิ่มพนักงาน
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter>Back</CardFooter>
    </Card>
  );
}
