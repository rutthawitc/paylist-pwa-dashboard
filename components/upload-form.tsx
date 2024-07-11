'use client';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

const MAX_FILE_SIZE = 5000000; // 5MB
const ACCEPTED_FILE_TYPES = [
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
];
const formSchema = z.object({
  file: z
    .custom<FileList>()
    .refine((files) => files?.length === 1, 'File is required.')
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      `Max file size is 5MB.`
    )
    .refine(
      (files) => ACCEPTED_FILE_TYPES.includes(files?.[0]?.type),
      'รองรับเฉพาะไฟล์ .xls และ .xlsx เท่านั้น'
    ),
});

const UploadForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    if (data.file && data.file.length > 0) {
      const file = data.file[0];
      console.log('File to upload:', file);

      // Here you would typically send the file to your server
      // For example:
      // const formData = new FormData();
      // formData.append("file", file);
      // await fetch('/api/upload', { method: 'POST', body: formData });

      console.log('File uploaded successfully');
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full p-10'>
        <FormField
          control={form.control}
          name='file'
          render={({ field: { onChange, value, ...rest } }) => {
            return (
              <FormItem>
                <FormLabel>File</FormLabel>
                <FormControl>
                  <Input
                    type='file'
                    onChange={(e) => onChange(e.target.files)}
                    accept='.xls,.xlsx'
                    {...rest}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <Button type='submit' className='mt-4'>
          Upload
        </Button>
      </form>
    </Form>
  );
};

export default UploadForm;
