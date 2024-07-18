'use server';

import { revalidatePath } from 'next/cache';

interface RevalidateProps {
  path: string;
}

export async function revalidateUrl(path: RevalidateProps) {
  revalidatePath(path.path);
}
