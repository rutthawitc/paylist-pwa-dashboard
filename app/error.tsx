'use client'
 
import { useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const router = useRouter()
  
  useEffect(() => {
    console.error('Application error:', error)
  }, [error])

  const handleReset = () => {
    // Clear any error state
    reset()
    // Force a hard refresh of the page
    window.location.reload()
  }

  const handleHome = () => {
    // Clear any error state
    reset()
    // Force navigation to home
    window.location.href = '/'
  }
 
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center space-y-4">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Database Connection Error</h1>
        <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
          ไม่สามารถเชื่อมต่อกับฐานข้อมูลได้ กรุณาลองใหม่อีกครั้ง
        </p>
      </div>
      <div className="flex gap-4">
        <Button onClick={handleReset}>ลองใหม่อีกครั้ง</Button>
        <Button variant="outline" onClick={handleHome}>กลับหน้าหลัก</Button>
      </div>
    </div>
  )
}
