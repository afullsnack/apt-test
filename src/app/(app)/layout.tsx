import { ReactNode } from 'react'
import { Inter } from 'next/font/google'
import { ScreenDeviceProvider } from '@app/lib/contexts'
import './global.css'
import { Container, Layout, Section } from '@/app/(app)/components/craft'
import { cn } from '@/app/(app)/lib/utils'
import { Separator } from '@/app/(app)/components/ui/separator'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

type Args = { children: ReactNode }
const _Layout = ({ children }: Args) => (
  <Layout className={cn(inter.className, 'h-screen')}>
    <body>
      <ScreenDeviceProvider>{children}</ScreenDeviceProvider>
    </body>
  </Layout>
)
export default _Layout
