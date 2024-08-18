'use client'

import Link from 'next/link'
import { Container, Section } from './craft'
import { Button } from './ui/button'
import { Separator } from './ui/separator'
import { useEffect, useState } from 'react'

// Component to render when test is done
type Args = {
  test: string
  section: string
  sectionName: string
  question: string | number
  records: Record<string, any>[]
  attemptId: string
}
export const FinishTest = ({ test, section, sectionName, question, records, attemptId }: Args) => {
  const [answers, setAnswers] = useState<string[]>(new Array<string>(30))
  const [score, setScore] = useState(0)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const attemptedAnswers = localStorage.getItem('answers')
      if (attemptedAnswers) {
        setAnswers(JSON.parse(attemptedAnswers))
      }
    }
  }, [])

  useEffect(() => {
    let correct = 0
    let failed = 0
    for (const record of records) {
      if (
        answers[records.findIndex((value) => value?.id === record?.id)] ===
        record?.fields['Correct Answer']
      ) {
        correct += 1
      } else {
        failed += 1
      }
    }

    setScore((correct / 30) * 100)
  }, [answers])

  return (
    <Section className="grid w-full grid-cols-2 gap-2 px-8">
      <Container className="bg-[#1FA1E0] text-white min-h-[calc(30vh)] w-full border border-border dark:bg-foreground flex flex-col p-8 items-center justify-center">
        <div>Test Quotes and Inspiration</div>
      </Container>

      <Container className="!p-3 flex flex-col space-y-4 w-full border border-border">
        <Separator className="w-full border-2 border-green-600" />
        <div className="bg-[#F1F2F4] p-4 grid items-center gap-2 w-full rounded-sm">
          <h1 className="font-semibold text-2xl">Your score: {score}%</h1>
          <span className="text-sm font-normal">Your average score for this test is 0%</span>
        </div>
        <p>
          You’re on your way. but we suggest you keep practicing. Our dashboard analytic allows you
          to keep track of your scores.
        </p>
        <Link href={'/test/mock-test'} passHref className="w-full grid">
          <Button>Take Another Test</Button>
        </Link>

        <div className="flex w-full items-end justify-between">
          <Link className="underline text-xs" href={`/solution/${test}/${section}/attemptId`}>
            Show solution
          </Link>
          <Link className="underline text-xs" href={'/overview'}>
            Your dashboard
          </Link>
        </div>
      </Container>
    </Section>
  )
}
