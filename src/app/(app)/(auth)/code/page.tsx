'use client'

import React from 'react'
import { Container, Main, Section } from '@/app/(app)/components/craft'
import { Button } from '@/app/(app)/components/ui/button'
import { Home } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { Label } from '@/app/(app)/components/ui/label'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/app/(app)/components/ui/card'
import { Input } from '@/app/(app)/components/ui/input'
import { Separator } from '@/app/(app)/components/ui/separator'
import { useRouter } from 'next/navigation'
import logo from '@/app/(app)/assets/logo.png'

export default function Code() {
  const { push } = useRouter()

  return (
    <Main>
      <Section className="grid gap-8 grid-cols-1">
        <Container className="grid place-items-center items-center justify-center">
          <Image src={logo} alt="logo" className="size-20 my-5" style={{ aspectRatio: 1 / 1 }} />
          <Card className="mx-auto max-w-lg">
            <CardHeader>
              <CardTitle className="text-xl text-center">Sign in</CardTitle>
              {/* <CardDescription>Enter your information to create an account</CardDescription> */}
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {/* <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="first-name">First name</Label>
                  <Input id="first-name" placeholder="Max" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="last-name">Last name</Label>
                  <Input id="last-name" placeholder="Robinson" required />
                </div>
              </div> */}
                <div className="grid gap-2">
                  <Label htmlFor="email">
                    Access code<small className="text-red-600 font-normal text-sm">*</small>
                  </Label>
                  <Input id="email" type="email" placeholder="123456" required />
                </div>
                {/* <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" />
              </div> */}
                <Button
                  type="submit"
                  className="w-full"
                  onClick={() => {
                    // push('/overview')
                  }}
                >
                  Login
                </Button>
                <div className="mt-4 text-center text-sm">
                  By continuing, you agree to the{' '}
                  <Link href="#" className="underline">
                    Terms of use
                  </Link>{' '}
                  and{' '}
                  <Link href="#" className="underline">
                    Privacy Policy
                  </Link>
                  .
                </div>
              </div>
              <Separator className="my-4" />
              <div className="text-center text-sm">
                {"Didn't"} get a code?{' '}
                <Link href="/resend" className="underline text-blue-300">
                  Resend
                </Link>
              </div>
            </CardContent>
          </Card>
        </Container>
      </Section>
    </Main>
  )
}
