import React from 'react'
import { Inter } from 'next/font/google'
import { Container, Layout, Section } from './components/craft'

import './global.css'
import { Button } from './components/ui/button'
import { Facebook } from 'lucide-react'
import Link from 'next/link'
import { cn } from './lib/utils'
import { Separator } from './components/ui/separator'
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

type Args = {
  children: React.ReactNode
}

const RootLayout = ({ children }: Args) => (
  <Layout className={cn(inter.className, 'h-screen')}>
    <body>
      {children}
      <footer className="h-12 border-t grid place-items-center border-border dark:border-border fixed bottom-0 right-0 left-0">
        <Container className="flex flex-col gap-4 md:flex-row w-full justify-center items-center m-0 !p-0">
          <Link href="/help-center">Help Center</Link>
          <Link href="/terms-of-service">Terms of Service</Link>
          <Link href="/privacy-policy">Privacy Policy</Link>
          <p className="text-muted-foreground">
            ©2024 <Link href="https://ruco.tech">Ruco tech</Link>
          </p>
        </Container>
      </footer>
    </body>
  </Layout>
)

export default RootLayout
