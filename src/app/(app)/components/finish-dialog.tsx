'use client'

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@app/components/ui/dialog'
import Link from 'next/link'
import { Container, Section } from './craft'
import { Button } from './ui/button'
import { Separator } from './ui/separator'
import { useEffect, useState } from 'react'

// Component to render when test is done
type Args = {
  scorePercent: number
  solutionLink: string
  open: boolean
}
export const FinishTestDialog = ({ scorePercent, solutionLink, open = false }: Args) => {
  return (
    <Dialog open={open}>
      <DialogContent hideCloseIcon className="max-w-2xl">
        <Section className="grid w-full gap-2 px-8">
          {/*<Container className="bg-[#1FA1E0] text-white min-h-[calc(30vh)] w-full border border-border dark:bg-foreground flex flex-col p-8 items-center justify-center">
            <div>Test Quotes and Inspiration</div>
            </Container>*/}

          <Container className="!p-3 flex flex-col space-y-4 w-full border border-border">
            <Separator className="w-full border-2 border-green-600" />
            <div className="bg-[#F1F2F4] p-4 grid items-center gap-2 w-full rounded-sm">
              <h1 className="font-semibold text-2xl">Your score: {scorePercent}%</h1>
              <span className="text-sm font-normal">Your average score for this test is 0%</span>
            </div>
            <p>
              You’re on your way. but we suggest you keep practicing. Our dashboard analytic allows
              you to keep track of your scores.
            </p>
            <Link href={'/test'} passHref className="w-full grid">
              <Button>Take Another Test</Button>
            </Link>

            <div className="flex w-full items-end justify-between">
              <Link className="underline text-xs" href={solutionLink}>
                Show solution
              </Link>
              <Link className="underline text-xs" href={'/overview'}>
                Your dashboard
              </Link>
            </div>
          </Container>
        </Section>
      </DialogContent>
    </Dialog>
  )
}
