/**
 * Test questions client component
 * params: test, sections, recrods, attemptId
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
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@app/components/ui/carousel'
import Image from 'next/image'
import { useQueryState, parseAsInteger, parseAsBoolean } from 'nuqs'
import { FinishTestDialog } from './finish-dialog'

type Args = {
  test: string
  sections: Array<any>
  attemptId: string
}
export const Question = ({ test, sections, attemptId }: Args) => {
  const [answers, setAnswers] = useState<string[]>(
    new Array<string>(sections.reduce((p, c) => c?.records?.length + p, 0)),
  )
  const [allRecords, setAllRecords] = useState<Array<any>>([])
  const [api, setApi] = useState<CarouselApi>()
  const [section, setSection] = useQueryState('section', { defaultValue: sections[0]?.id })
  const [current, setCurrent] = useQueryState('question', parseAsInteger.withDefault(0))
  const [finish, setFinish] = useQueryState('finish', parseAsBoolean.withDefault(false))
  const [count, setCount] = useState(0)

  const [score, setScore] = useState(0)
  const [showScoreDialog, setShowScoreDialog] = useState<boolean>(false)

  const pathname = usePathname()

  console.log(sections[0]?.records[0], ':::records')

  useEffect(() => {
    setAllRecords((_prev) => [
      ..._prev,
      ...sections.reduce((flat, sec) => flat.concat(sec?.records), []),
    ])
  }, [])

  useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)
    setSection(section ?? sections[0]?.id)
    setFinish(finish ?? false)

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  useEffect(() => {
    if (finish) {
      // TODO: compute total score
      // TODO: trigger dialog toggle and pass in score and solution link
      let correct = 0
      let failed = 0
      for (const section of sections) {
        for (const record of section?.records) {
          if (
            answers[section?.records.findIndex((value: any) => value?.id === record?.id)] ===
            record?.fields['Correct Answer']
          ) {
            correct += 1
          } else {
            failed += 1
          }
        }
      }

      setScore(Math.floor((correct / 120) * 100))
      setShowScoreDialog(true)
    }
  }, [finish])

  return (
    <Section className="max-w-screen px-8">
      <FinishTestDialog
        scorePercent={score}
        open={showScoreDialog}
        solutionLink={`/solution/mock-test/${attemptId}`}
      />
      <Section className="!p-8 w-full border border-blue-300 flex items-center justify-between">
        <h1 className="text-3xl font-semibold capitalize">
          {sections.find((value) => value?.id === section)?.name}
        </h1>

        <>
          <CountdownTimer
            minutes={120}
            onFinish={() => {
              setFinish(true)
            }}
          />
          <div className="flex items-center space-x-2">
            <span>
              {/* @ts-ignore */}
              Question {current} of {allRecords?.length}
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
          {allRecords.map((q, index) => (
            <CarouselItem key={index ?? q?.id} className="grid-cols-3 gap-2 grid">
              <Container className="bg-background w-full border col-span-2 border-border dark:bg-foreground flex flex-col p-8 items-center justify-center">
                <div>
                  <p className="text-xl">{q?.fields['Questions']}</p>
                  {q?.fields['Images'] && q?.fields['Images']?.length && (
                    <Image
                      src={q?.fields['Images'][0]?.url}
                      width={1220}
                      height={480}
                      alt="question media"
                      // fill
                      className="object-contain"
                    />
                  )}
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
                      {current === sections.find((s) => s?.id === section)?.records.length ||
                      current === 60 ||
                      current === 90
                        ? 'Start next section'
                        : 'Next'}
                    </Button>
                  )}
                  {!api?.canScrollNext() && (
                    <ConfirmSubmitDialog
                      onConfirm={() => {
                        // TODO: call payload to store attempt to DB
                        if (typeof answers[current - 1] !== 'undefined') {
                          // TODO: store answers array to localStorage for solution
                          if (typeof window !== 'undefined') {
                            localStorage.setItem(
                              `answers:${attemptId}`,
                              JSON.stringify({
                                answers,
                                records: allRecords,
                                sections,
                              }),
                            )
                          }

                          setFinish(true)
                        } else {
                          alert('Pick an option to continue')
                          // setCurrent(api.selectedScrollSnap() + 1)
                        }
                      }}
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
