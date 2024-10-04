/**
 * Test questions and solutions client component
 * params: test, type, sections, records, attemptId, testDurationMinutes
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
import { baseIds, cn } from '../lib/utils'
import Link from 'next/link'

type Args = {
  test: 'cnc' | 'custom' | 'nnpcl' // TODO: might remove, if not used
  type: 'solution' | 'question'
  sections: Array<any>
  attemptId: string
  testDurationInMinutes?: number
}
export const Question = ({ test, type, sections, attemptId, testDurationInMinutes }: Args) => {
  const [answers, setAnswers] = useState<string[]>(
    new Array<string>(sections.reduce((p, c) => c.questionCount + p, 0)),
  )
  const [allRecords, setAllRecords] = useState<Array<any>>([])
  const [api, setApi] = useState<CarouselApi>()
  const [section, setSection] = useQueryState('section', { defaultValue: sections[0]?.id })
  const [current, setCurrent] = useQueryState('question', parseAsInteger.withDefault(0))
  const [finish, setFinish] = useQueryState(
    'finish',
    parseAsBoolean.withDefault(type === 'question' ? false : true),
  )
  const [count, setCount] = useState(0)

  const [score, setScore] = useState(0)
  const [showScoreDialog, setShowScoreDialog] = useState<boolean>(false)

  // NOTE: solution state
  const [solutionSections, setSolutionSections] = useState<Array<any>>([])
  // const [solutionRecords, setSolutionRecords] = useState<Array<any>>([]);

  console.log(allRecords[current - 1], ':::current records') // should be the only log

  // NOTE: flatten sections records into single questions list
  useEffect(() => {
    for (const section of sections) {
      const questions = section?.records
        ?.splice(0, section?.questionCount)
        .map((rec: Record<string, any>) => ({ sectionId: section?.id, ...rec }))
      setAllRecords((_prev) => [..._prev, ...questions])
    }
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
    if (finish && type === 'question') {
      // TODO: compute total score
      // TODO: trigger dialog toggle and pass in score and solution link
      let correct = 0
      let failed = 0

      for (const record of allRecords) {
        if (
          answers[allRecords.findIndex((value: any) => value?.id === record?.id)] ===
          record?.fields['Correct Answer']
        ) {
          correct += 1
        } else {
          failed += 1
        }
      }

      setScore(Math.floor((correct / 120) * 100))
      setShowScoreDialog(true)
    } else if (finish && type === 'solution') {
      // TODO: get localStorage and display decode answers
      if (typeof window !== 'undefined') {
        const localAnswers = localStorage.getItem(`answers:${attemptId}`)
        if (localAnswers) {
          const answerObj = JSON.parse(localAnswers) satisfies {
            answers: any[]
            records: any[]
            sections: any[]
          }
          setAnswers(answerObj?.answers)
          setSolutionSections(answerObj?.sections)
          setSection(section ?? answerObj?.sections[0]?.id)
          setAllRecords(answerObj?.records)

          // console.log(answerObj?.sections[0]?.id, ':::section')
        } else {
          alert(
            'The answers for this attempt is not found, kindly take a new test to see the solutons',
          )
        }
      }
    }
  }, [finish, type])

  return (
    <Section className="max-w-screen px-8">
      <FinishTestDialog
        scorePercent={score}
        open={showScoreDialog}
        solutionLink={`/solution/${test}/${baseIds[test]}/${attemptId}`}
      />
      <Section className="!p-8 w-full border border-blue-300 flex items-center justify-between">
        <h1 className="text-3xl font-semibold capitalize">
          {type === 'question'
            ? sections.find((value) => value?.id === section)?.name
            : solutionSections.find((value) => value?.id === section)?.name}
        </h1>

        <>
          {type === 'question' && (
            <CountdownTimer
              minutes={testDurationInMinutes ?? 120}
              onFinish={() => {
                setFinish(true)
              }}
            />
          )}
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
                  <p className="text-xl mb-6">{q?.fields['Questions']}</p>
                  {q?.fields['Image'] && !!q?.fields['Image']?.length && (
                    <Image
                      src={q?.fields['Image'][0]?.url}
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
                      defaultValue={answers[current - 1]?.trim()}
                      value={answers[current - 1]}
                      onValueChange={(value) =>
                        setAnswers((_prev) => {
                          _prev[current - 1] = value
                          return _prev
                        })
                      }
                      disabled={type === 'solution'}
                      className="p-4 rounded-sm"
                    >
                      {Object.entries(q.fields)
                        .filter(([field, _]) => field.toLowerCase().includes('option'))
                        .sort(([aField, aValue], [bField, bValue]) => aField.localeCompare(bField))
                        .map(([field, value], index) => {
                          return (
                            <div
                              key={index}
                              className={cn(
                                'flex items-center border border-muted-foreground/45 p-2 rounded-md justify-between gap-4',
                                type === 'solution' && {
                                  'bg-green-500 text-black':
                                    (value as string).toLowerCase() ===
                                    q.fields['Correct Answer'].toLowerCase(),
                                  'bg-red-500 text-black':
                                    answers[current - 1].toLowerCase() !==
                                      q.fields['Correct Answer'].toLowerCase() &&
                                    (value as string).toLowerCase() ===
                                      answers[current - 1].toLowerCase(),
                                },
                              )}
                            >
                              <div className="items-center justify-start space-x-2">
                                <RadioGroupItem
                                  disabled={type === 'solution'}
                                  value={value as string}
                                  id={field}
                                />
                                <Label htmlFor={field} className="text-left items-center font-bold">
                                  {field}: {value as string}
                                </Label>
                              </div>
                              {/* <span className="text-xs font-bold">{section.questionCount} questions</span> */}
                            </div>
                          )
                        })}
                    </RadioGroup>
                  </>
                }
                <div className="flex items-center justify-center gap-4 w-full ">
                  {api?.canScrollPrev() && (
                    <Button
                      onClick={() => {
                        setCurrent(api.selectedScrollSnap() - 1)
                        api.scrollPrev()
                        setSection(allRecords[api.selectedScrollSnap() - 1]?.sectionId)
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
                          setSection(allRecords[api.selectedScrollSnap() + 1]?.sectionId)
                          api.scrollNext()
                        } else {
                          alert('Pick an option to continue')
                        }
                      }}
                    >
                      {current !== allRecords?.length &&
                      allRecords[api.selectedScrollSnap()]?.sectionId !==
                        allRecords[api.selectedScrollSnap() + 1]?.sectionId
                        ? 'Start next section'
                        : 'Next'}
                    </Button>
                  )}
                  {!api?.canScrollNext() &&
                    (type === 'question' ? (
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
                    ) : (
                      <Link href={'/overview'} passHref>
                        <Button>Dashboard</Button>
                      </Link>
                    ))}
                </div>

                {/* NOTE: Explanation text goes here in solution type */}
                {type === 'solution' && q.fields['Explanation'] && (
                  <div className="flex flex-col w-full border border-primary p-2">
                    <p className="text-lg font-normal">{q.fields['Explanation']}</p>
                  </div>
                )}
              </Container>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </Section>
  )
}
