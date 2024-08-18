'use client'

import { Section, Container } from '@app/components/craft'
import { FC, useState } from 'react'
import { Separator } from './ui/separator'
import { Button } from './ui/button'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { usePathname, useRouter } from 'next/navigation'
import { Star } from './star'

export type TestSection = {
  id: string
  name: string
  questionCount: number
}
export const TestEntry: FC<{
  title: string
  description: string
  sections: TestSection[]
  totalQuestionCount: number
  attempts: number
}> = ({ title, description, sections, totalQuestionCount, attempts }) => {
  const [display, setDisplay] = useState<'entry' | 'sections'>('sections')
  const [section, setSection] = useState<string>()
  const { push } = useRouter()
  const pathname = usePathname()

  return (
    <Section className="grid w-full place-items-center">
      <Container className="bg-background border border-border min-w-[620px] dark:bg-foreground flex flex-col p-8 items-center justify-center space-y-6">
        <h1 className="font-bold text-xl">{title}</h1>
        <Separator className="bg-[#1FA1E0] my-1" />
        <div className="flex justify-center gap-6 w-full px-8 items-center">
          <span className="text-sm font-normal">
            <b>{sections.length}</b> Section(s) | <b>{totalQuestionCount}</b> Questions | <b>120</b>{' '}
            Minutes
          </span>

          {/*<div className="space-x-2 flex">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star key={index} className="text-yellow-400" />
            ))}
          </div>*/}
        </div>
        {display === 'entry' && (
          <>
            <p className="text-balance text-center">{description}</p>
            <p>{attempts}/4 Attempts</p>
            <Button onClick={() => setDisplay('sections')}>Next</Button>
          </>
        )}
        {display === 'sections' && (
          <Container className="gap-4 grid">
            {/*<RadioGroup
              defaultValue={section}
              onValueChange={(value) => setSection(value)}
              className="bg-muted-foreground/15 p-4 rounded-sm"
            >*/}
            {sections.map((section) => (
              <div key={section.id} className="flex items-center justify-between gap-4">
                <div className="items-center justify-start space-x-1">
                  {/*<RadioGroupItem value={section.id.toString()} id={section.id.toString()} />*/}
                  <Label htmlFor={section.id.toString()} className="text-left">
                    {section.name}
                  </Label>
                </div>
                <span className="text-xs font-bold">{section.questionCount} questions</span>
              </div>
            ))}
            {/*</RadioGroup>*/}
            <Button
              onClick={() => {
                if (!section) {
                  return alert('Select a section to get started')
                }

                // push to section
                push(`${pathname}/${section}`)
              }}
            >
              Start test
            </Button>
          </Container>
        )}
        <div className="flex items-center w-full justify-end">
          {/* Toggle, and show previous score from previous attempt */}
          {false && (
            <p className="text-sm font-normal">
              Previous score: <b>120</b>
            </p>
          )}
        </div>
      </Container>
    </Section>
  )
}
