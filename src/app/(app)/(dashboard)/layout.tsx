'use client'

import React from 'react'
import { Inter } from 'next/font/google'
import { Layout } from '@/app/(app)/components/craft'
import { Button } from '@/app/(app)/components/ui/button'
import { Bell, Calendar, CircleUser, Home, LogOutIcon, Menu } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { cn } from '@/app/(app)/lib/utils'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/app/(app)/components/ui/dropdown-menu'
import { Sheet, SheetContent, SheetTrigger } from '@/app/(app)/components/ui/sheet'
import '../global.css'
import logo from '../assets/logo.png'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

type Args = {
  children: React.ReactNode
}

const DashboardLayout = ({ children }: Args) => {
  const pathname = usePathname()
  const router = useRouter()

  return (
    <Layout className={cn(inter.className, 'h-screen')}>
      <body>
        <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
          <div className="hidden border-r bg-muted/40 md:block">
            <div className="flex h-full max-h-screen flex-col gap-2">
              <div className="flex h-14 items-center border-b px-4 lg:h-[80px] lg:px-6">
                <Link href="/" className="flex items-center gap-2 font-semibold">
                  <Image src={logo} style={{ aspectRatio: 1 / 1 }} alt="logo" className="h-6 w-6" />
                  <span className="">Ruco Tech</span>
                </Link>
              </div>
              <div className="flex-1">
                <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                  <Link
                    href="/overview"
                    className={cn(
                      'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                      {
                        'bg-muted': pathname.includes('overview'),
                        'text-foreground': pathname.includes('overview'),
                      },
                    )}
                  >
                    <Home className="h-4 w-4" />
                    Overview
                  </Link>
                  <Link
                    href="/test"
                    className={cn(
                      'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                      {
                        'bg-muted': pathname.includes('test'),
                        'text-foreground': pathname.includes('test'),
                      },
                    )}
                  >
                    <Calendar className="h-4 w-4" />
                    Test Taker
                  </Link>
                  <Link
                    href="#"
                    onClick={(e) => {
                      e.preventDefault()
                      // TODO: call logout function
                      router.replace('/')
                    }}
                    className={cn(
                      'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-destructive',
                    )}
                  >
                    <LogOutIcon className="h-4 w-4" />
                    Logut{' '}
                  </Link>
                  {/* <Link
                  href="#"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                >
                  <Users className="h-4 w-4" />
                  Customers
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                >
                  <LineChart className="h-4 w-4" />
                  Analytics
                </Link> */}
                </nav>
              </div>
              {/* <div className="mt-auto p-4">
              <Card x-chunk="dashboard-02-chunk-0">
                <CardHeader className="p-2 pt-0 md:p-4">
                  <CardTitle>Upgrade to Pro</CardTitle>
                  <CardDescription>
                    Unlock all features and get unlimited access to our support team.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
                  <Button size="sm" className="w-full">
                    Upgrade
                  </Button>
                </CardContent>
              </Card>
            </div> */}
            </div>
          </div>
          <div className="flex flex-col">
            <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[80px] lg:px-6">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="shrink-0 md:hidden">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle navigation menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="flex flex-col">
                  <nav className="grid gap-2 text-lg font-medium">
                    <Link href="#" className="flex items-center gap-2 text-lg font-semibold">
                      <Image
                        src={logo}
                        style={{ aspectRatio: 1 / 1 }}
                        alt="logo"
                        className="h-6 w-6"
                      />
                      <span className="">Ruco Tech</span>
                    </Link>
                    <Link
                      href="/overview"
                      className={cn(
                        'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                        {
                          'bg-muted': pathname.includes('overview'),
                        },
                      )}
                    >
                      <Home className="h-4 w-4" />
                      Overview
                    </Link>
                    <Link
                      href="/test"
                      className={cn(
                        'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                        {
                          'bg-muted': pathname.includes('test'),
                        },
                      )}
                    >
                      <Calendar className="h-4 w-4" />
                      Test Taker
                      {/* <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                      6
                    </Badge> */}
                    </Link>
                    <Link
                      href="#"
                      onClick={(e) => {
                        e.preventDefault()
                        router.replace('/')
                      }}
                      className={cn(
                        'flex items-center gap-3 rounded-lg px-3 py-2 text-primary transition-all hover:text-primary',
                      )}
                    >
                      <LogOutIcon className="h-4 w-4" />
                      Logut{' '}
                    </Link>
                    {/* <Link
                    href="#"
                    className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                  >
                    <Users className="h-5 w-5" />
                    Customers
                  </Link>
                  <Link
                    href="#"
                    className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                  >
                    <LineChart className="h-5 w-5" />
                    Analytics
                  </Link> */}
                  </nav>
                  {/* <div className="mt-auto">
                    <Card>
                      <CardHeader>
                        <CardTitle>Upgrade to Pro</CardTitle>
                        <CardDescription>
                          Unlock all features and get unlimited access to our support team.
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button size="sm" className="w-full">
                          Upgrade
                        </Button>
                      </CardContent>
                    </Card>
                  </div> */}
                </SheetContent>
              </Sheet>
              <div className="w-full flex-1 flex flex-col">
                <h1 className="text-balance text-lg font-semibold">Hi {'Jake'}, Good Afternoon</h1>
                <span className="text-balance text-sx font-normal">
                  Lets learn something new today
                </span>
                {/* <form>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search products..."
                    className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                  />
                </div>
              </form> */}
              </div>
              <div>
                <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
                  <Bell className="h-4 w-4" />
                  <span className="sr-only">Toggle notifications</span>
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="secondary" size="icon" className="rounded-full">
                      <CircleUser className="h-5 w-5" />
                      <span className="sr-only">Toggle user menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                    <DropdownMenuItem>Password</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600 hover:text-white hover:bg-red-600">
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </header>

            {children}
          </div>
        </div>
      </body>
    </Layout>
  )
}

export default DashboardLayout
