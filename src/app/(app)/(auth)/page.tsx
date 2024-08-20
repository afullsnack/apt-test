'use client'

import React from 'react'
import { Container, Main, Section } from '@/app/(app)/components/craft'
import { Button } from '@/app/(app)/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import logo from '../assets/logo.png'
import welcomeHero from '../assets/welcome-img.png'
import { ArrowRight } from 'lucide-react'

const Index = () => {
  return (
    <Main className="h-screen !p-0 overflow-clip">
      <Section className="grid grid-cols-2 !p-0 h-full w-full">
        <Container className="flex flex-col gap-4 w-full h-full place-items-start justify-start relative">
          <Image
            src={logo}
            alt="logo"
            className="size-20 mb-5 mt-[20%]"
            style={{ aspectRatio: 1 / 1 }}
          />
          <h1 className="font-bold text-3xl">
            Welcome To <span className="text-[#1E8DCC]">RucoTech</span>
          </h1>
          <span className="font-medium text-xl">CBT Training Platform</span>
          <span className="font-light text-lg">
            With an intuitive interface and a comprehensive suite of tools, the platform offers
            dynamic, interactive learning experiences tailored to meet diverse educational needs.
          </span>
          <Link href="/code" passHref>
            <Button>
              Get started <ArrowRight className="size-4 ml-4" />{' '}
            </Button>
          </Link>

          <div className="h-12 border-t grid place-items-center border-border dark:border-border absolute bottom-0 right-0 left-0">
            <Container className="flex gap-4 flex-row w-full justify-center items-center m-0 !p-0">
              <Link href="/help-center">Help Center</Link>
              <Link href="/terms-of-service">Terms of Service</Link>
              <Link href="/privacy-policy">Privacy Policy</Link>
              <p className="text-muted-foreground">
                ©2024 <Link href="https://ruco.tech">Ruco tech</Link>
              </p>
            </Container>
          </div>
        </Container>
        <Container className="overflow-hidden !p-0 w-full h-full">
          <Image
            src={welcomeHero}
            alt="welcomeHero"
            // className="h-full"
            style={{ backgroundSize: 'cover' }}
          />
        </Container>
      </Section>
    </Main>
  )
}

export default Index
