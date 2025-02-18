// app/app-error/page.tsx
"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function AppError() {
  const router = useRouter()

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center space-y-4">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Database Connection Error</h1>
        <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
          ไม่สามารถเชื่อมต่อกับฐานข้อมูลได้ กรุณาลองใหม่อีกครั้ง
        </p>
      </div>
      <Button onClick={() => router.refresh()}>ลองใหม่อีกครั้ง</Button>
    </div>
  )
}
