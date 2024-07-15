'use client';
import { addrecipient } from '@/actions/addrecipient';
import { FormError } from '@/components/form-error';
import { FormSuccess } from '@/components/form-success';
import { Input } from '@/components/ui/input';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { AddRecipientSchema } from '@/schemas';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

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
import { useState, useTransition } from 'react';

const AddRecipientForm = () => {
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  //Define  form
  const form = useForm<z.infer<typeof AddRecipientSchema>>({
    resolver: zodResolver(AddRecipientSchema),
    defaultValues: {
      short_name: '',
      full_name: '',
    },
  });

  //Define onSubmit
  const onSubmit = (values: z.infer<typeof AddRecipientSchema>) => {
    setError('');
    setSuccess('');
    startTransition(() => {
      addrecipient(values).then((data) => {
        setError(data.error);
        setSuccess(data.success);
        if (data.success) {
          router.refresh();
        }
      });
    });
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-4 flex-row'>
          <div className='grid gap-4'>
            <FormError message={error || ''} />
            <FormSuccess message={success || ''} />
            <FormField
              control={form.control}
              name='short_name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ชื่อสั้น/ชื่อที่ถูกตัด</FormLabel>
                  <FormControl>
                    <Input placeholder='ชื่อผู้รับ/ชื่อที่ถูกตัด' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='full_name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ชื่อเต็มบริษัท/ชื่อผู้รับ</FormLabel>
                  <FormControl>
                    <Input placeholder='ชื่อเต็มผู้รับ' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type='submit'>Submit</Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default AddRecipientForm;
