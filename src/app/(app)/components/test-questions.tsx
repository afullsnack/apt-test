'use client'

import { Section, Container } from '@app/components/craft'
import { CircleAlert } from 'lucide-react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { Button } from './ui/button'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ConfirmSubmitDialog } from './confirm-submit-dialog'

type Args = {
  test: string
  section: string
  question: string | number
}
export const Question = ({ test, section, question }: Args) => {
  const [answer, setAnswer] = useState<string>()
  const router = useRouter()

  return (
    <Section className="grid w-full grid-cols-3 gap-2 px-8">
      <Container className="col-span-2 bg-background w-full border border-border dark:bg-foreground flex flex-col p-8 items-center justify-center">
        <div>Question</div>
      </Container>

      <Container className="!p-3 flex flex-col space-y-4 w-full border border-border">
        <div className="bg-[#F1F2F4] flex items-center space-x-2 w-full p-2 rounded-lg">
          <CircleAlert className="w-4 h-4" />
          <span>Select one option</span>
        </div>

        {
          <>
            <RadioGroup
              defaultValue={answer}
              onValueChange={(value) => setAnswer(value)}
              className="p-4 rounded-sm"
            >
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="flex items-center border border-muted-foreground/45 p-2 rounded-md justify-between gap-4"
                >
                  <div className="items-center justify-start space-x-2">
                    <RadioGroupItem value={index.toString()} id={index.toString()} />
                    <Label htmlFor={index.toString()} className="text-left items-center font-bold">
                      Option {index === 0 ? 'A' : index === 1 ? 'B' : 'C'}
                    </Label>
                  </div>
                  {/* <span className="text-xs font-bold">{section.questionCount} questions</span> */}
                </div>
              ))}
            </RadioGroup>
          </>
        }
        <div className="flex items-center justify-end gap-4 w-full ">
          <Button>Back</Button>
          <ConfirmSubmitDialog onConfirm={() => router.push(`/test/${test}/${section}/finish`)}>
            <Button>Finish</Button>
          </ConfirmSubmitDialog>
        </div>
      </Container>
    </Section>
  )
}
