'use client'

import { ConfirmCloseDialog } from '@/app/(app)/components/confirm-close-dialog'
import CountdownTimer from '@/app/(app)/components/countdown-timer'
import { Section, Container } from '@app/components/craft'
import { CircleAlert } from 'lucide-react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { Button } from './ui/button'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ConfirmSubmitDialog } from './confirm-submit-dialog'
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@app/components/ui/carousel'

type Args = {
  test: string
  section: string
  sectionName: string
  question: string | number
  records: Record<string, any>[]
}
export const Question = ({ test, section, sectionName, question, records }: Args) => {
  const [answer, setAnswer] = useState<string>()
  const router = useRouter()
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  console.log(records[0]?.fields, ':::Question id')

  return (
    <Section className="max-w-screen px-8">
      <Section className="!p-8 w-full border border-blue-300 flex items-center justify-between">
        <h1 className="text-3xl font-semibold capitalize">{sectionName}</h1>
        {question !== 'finish' && (
          <>
            <CountdownTimer minutes={1} />
            <div className="flex items-center space-x-2">
              <span>
                {/* @ts-ignore */}
                Question {current} of {records?.length}
              </span>
              <ConfirmCloseDialog>
                <Button variant="outline" size={'sm'}>
                  Close
                </Button>
              </ConfirmCloseDialog>
            </div>
          </>
        )}
      </Section>
      <Carousel
        opts={{
          align: 'center',
          loop: false,
          dragThreshold: 0,
          dragFree: false,
          watchDrag: false,
        }}
        setApi={setApi}
        className="w-full"
      >
        <CarouselContent>
          {records.map((q, index) => (
            <CarouselItem key={index ?? q?.id} className="grid-cols-3 gap-2 grid">
              <Container className="bg-background w-full border col-span-2 border-border dark:bg-foreground flex flex-col p-8 items-center justify-center">
                <div>
                  <p className="text-xl">{q?.fields['Questions']}</p>
                </div>
              </Container>

              <Container className="!p-3 flex flex-col w-full space-y-4 border border-border">
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
                      {Object.entries(q.fields)
                        .filter(([field, _]) => field.toLowerCase().includes('option'))
                        .sort(([aField, aValue], [bField, bValue]) => aField.localeCompare(bField))
                        .map(([field, value], index) => (
                          <div
                            key={index}
                            className="flex items-center border border-muted-foreground/45 p-2 rounded-md justify-between gap-4"
                          >
                            <div className="items-center justify-start space-x-2">
                              <RadioGroupItem value={value as string} id={field} />
                              <Label htmlFor={field} className="text-left items-center font-bold">
                                {field}: {value as string}
                              </Label>
                            </div>
                            {/* <span className="text-xs font-bold">{section.questionCount} questions</span> */}
                          </div>
                        ))}
                    </RadioGroup>
                  </>
                }
                <div className="flex items-center justify-center gap-4 w-full ">
                  {api?.canScrollPrev() && (
                    <Button
                      onClick={() => {
                        if (answer) {
                          api.scrollPrev()
                        }
                      }}
                    >
                      Back
                    </Button>
                  )}
                  {api?.canScrollNext() && (
                    <Button
                      onClick={() => {
                        if (answer) {
                          api.scrollNext()
                        } else {
                          alert('Pick an option to continue')
                        }
                      }}
                    >
                      Next
                    </Button>
                  )}
                  {!api?.canScrollNext() && (
                    <ConfirmSubmitDialog
                      onConfirm={() => router.push(`/test/${test}/${section}/finish`)}
                    >
                      <Button>Finish</Button>
                    </ConfirmSubmitDialog>
                  )}
                </div>
              </Container>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </Section>
  )
}
