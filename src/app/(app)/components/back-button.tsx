'use client'

import { ArrowLeft } from 'lucide-react'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'

export const BackButton = () => {
  const router = useRouter()

  return (
    <Button
      variant={'link'}
      size={'default'}
      className="flex items-center gap-1"
      onClick={() => {
        router.back()
      }}
    >
      <ArrowLeft className="size-4 text-white" color="white" />
      <span className="text-white font-semibold">Back</span>
    </Button>
  )
}
