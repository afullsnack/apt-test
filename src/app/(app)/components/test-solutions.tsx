/**
 * Solutons component, cycle through questions and display correct answers
 * params: test, sections, records, attemptId
 */

'use client'

import { ConfirmCloseDialog } from '@/app/(app)/components/confirm-close-dialog'
import CountdownTimer from '@/app/(app)/components/countdown-timer'
import { Section, Container } from '@app/components/craft'
import { CircleAlert } from 'lucide-react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { Button } from './ui/button'
import { useEffect, useState } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { ConfirmSubmitDialog } from './confirm-submit-dialog'
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '@app/components/ui/carousel'
import { useQueryState, parseAsInteger, parseAsBoolean } from 'nuqs'
import { FinishTestDialog } from './finish-dialog'
import Link from 'next/link'
import { cn } from '@app/lib/utils'

type Args = {
  test: string
  // sections: Record<string, any>[]
  // records: Record<string, any>[]
  attemptId: string
}
export const Solutions = ({ test, attemptId }: Args) => {
  const [answers, setAnswers] = useState<string[]>([])
  const [records, setRecords] = useState<any[]>([])
  const [sections, setSections] = useState<any[]>([])
  const [api, setApi] = useState<CarouselApi>()
  const [section, setSection] = useQueryState('section', { defaultValue: '' })
  const [current, setCurrent] = useQueryState('question', parseAsInteger.withDefault(0))
  const [finish, setFinish] = useQueryState('finish', parseAsBoolean.withDefault(true))
  const [count, setCount] = useState(0)

  const pathname = usePathname()
  // const searchParams = useSearchParams()

  console.log(pathname, ':::pathname')

  useEffect(() => {
    if (!api) {
      return
    }

    // TODO: store answers array to localStorage for solution
    if (typeof window !== 'undefined') {
      const localAnswers = localStorage.getItem(`answers:${attemptId}`)
      if (localAnswers) {
        const answerObj = JSON.parse(localAnswers) satisfies {
          answers: any[]
          records: any[]
          sections: any[]
        }
        setAnswers(answerObj?.answers)
        setSections(answerObj?.sections)
        setSection(section ?? answerObj?.sections[0]?.id)
        setRecords(answerObj?.records)
      } else {
        alert(
          'The answers for this attempt is not found, kindly take a new test to see the solutons',
        )
      }
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)
    setFinish(finish ?? true)

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  return (
    <Section className="max-w-screen px-8">
      <Section className="!p-8 w-full border border-blue-300 flex items-center justify-between">
        <h1 className="text-3xl font-semibold capitalize">
          {sections.find((value) => value?.id === section)?.name}
        </h1>

        <>
          {/*<CountdownTimer minutes={120} />*/}
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
          startIndex: current - 1,
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
                      onValueChange={(value) =>
                        setAnswers((_prev) => {
                          _prev[current - 1] = value
                          return _prev
                        })
                      }
                      disabled
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
                                'bg-green-500 text-black':
                                  value === q.fields[current - 1]['Correct Answer'],
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
                        if (typeof answers[current - 1] !== 'undefined') {
                          setCurrent(api.selectedScrollSnap() + 1)
                          api.scrollNext()

                          if (current === 30 || current === 60 || current === 90) {
                            setSection(
                              sections[sections.findIndex((value) => value?.id === section) + 1]
                                ?.id,
                            )
                          }
                        } else {
                          alert('Pick an option to continue')
                        }
                      }}
                    >
                      {'Next'}
                    </Button>
                  )}
                  {!api?.canScrollNext() && (
                    <Link href={'/overview'} passHref>
                      <Button>Dashboard</Button>
                    </Link>
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
