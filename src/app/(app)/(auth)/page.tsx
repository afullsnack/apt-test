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
import logo from '../assets/logo.png'

const Index = () => {
  return (
    <Main className="min-h-screen">
      <Section className="grid gap-8 grid-cols-1">
        <Container className="grid place-items-center items-center justify-center">
          <Image src={logo} alt="logo" className="size-20 my-5" style={{ aspectRatio: 1 / 1 }} />
          <Link href="/code" passHref>
            <Button>Login with access code</Button>
          </Link>
        </Container>
      </Section>
    </Main>
  )
}

export default Index
