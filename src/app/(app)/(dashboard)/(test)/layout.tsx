import React from 'react'
import { Inter } from 'next/font/google'
import { Container, Layout, Section } from '@/app/(app)/components/craft'

import { Button } from '@/app/(app)/components/ui/button'
import { Facebook } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/app/(app)/lib/utils'
import { Separator } from '@/app/(app)/components/ui/separator'
import '@app/global.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

type Args = {
  children: React.ReactNode
}

const TesterLayout = ({ children }: Args) => {
  return <body>{children}</body>
}

export default TesterLayout
