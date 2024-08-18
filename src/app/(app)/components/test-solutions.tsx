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
import { useQueryState, parseAsInteger } from 'nuqs'
import { cn } from '@app/lib/utils'

type Args = {
  test: string
  sections: Record<string, any>[]
  records: Record<string, any>[]
  attemptId: string
}
export const Solutions = ({ test, sections, records, attemptId }: Args) => {
  const [answers, setAnswers] = useState<string[]>(new Array<string>(30))
  const router = useRouter()
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useQueryState('current', parseAsInteger.withDefault(0))
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    if (typeof window !== 'undefined') {
      const attemptedAnswers = localStorage.getItem('answers')
      if (attemptedAnswers) {
        setAnswers(JSON.parse(attemptedAnswers))
      }
    }

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  console.log(answers, ':::List of answers')

  return (
    <Section className="max-w-screen px-8">
      <Section className="!p-8 w-full border border-blue-300 flex items-center justify-between">
        <h1 className="text-3xl font-semibold capitalize">{sections[0]?.name}</h1>

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
                  <span className="text-sm">Select one option</span>
                </div>

                {
                  <>
                    <RadioGroup
                      defaultValue={answers[current - 1]}
                      disabled
                      onValueChange={(value) =>
                        setAnswers((_prev) => {
                          _prev[current - 1] = value
                          return _prev
                        })
                      }
                      className="p-4 rounded-sm"
                    >
                      {Object.entries(q.fields)
                        .filter(([field, _]) => field.toLowerCase().includes('option'))
                        .sort(([aField, aValue], [bField, bValue]) => aField.localeCompare(bField))
                        .map(([field, value], index) => (
                          <div
                            key={index}
                            className={cn(
                              'flex items-center border border-muted-foreground/45 p-2 rounded-md justify-between gap-4',
                              {
                                'bg-green-600 text-black':
                                  answers[current - 1] === q.fields['Correct Answer'],
                                'bg-red-600 text-white':
                                  answers[current - 1] !== q.fields['Correct Answer'],
                              },
                            )}
                          >
                            <div className="items-center justify-start space-x-2">
                              <RadioGroupItem disabled value={value as string} id={field} />
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
                        setCurrent(current! - 1)
                        api.scrollPrev()
                        // if (typeof answers[current] !== 'undefined') {
                        // }
                      }}
                    >
                      Back
                    </Button>
                  )}
                  {api?.canScrollNext() && (
                    <Button
                      onClick={() => {
                        setCurrent(api.selectedScrollSnap() + 1)
                        api.scrollNext()
                      }}
                    >
                      Next
                    </Button>
                  )}
                  {!api?.canScrollNext() && (
                    <Button
                      onClick={() => {
                        router.push('/overview')
                      }}
                    >
                      Back to dashboard
                    </Button>
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
