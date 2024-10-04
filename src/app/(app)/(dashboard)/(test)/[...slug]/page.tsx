import { TestEntry } from '@app/components/test-entry'
import { SectionEntry } from '@app/components/test-section-entry'
import { Main, Section, Container } from '@app/components/craft'
import { Question } from '@app/components/test-questions'
// import { Button } from '@app/components/ui/button'
import crypto from 'node:crypto'

import { Airtable, NoBaseIdError } from '@/airtable.config'
import React from 'react'
import { Solutions } from '@app/components/test-solutions'
import { notFound } from 'next/navigation'
import { testTypes } from '@/app/(app)/lib/utils'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/app/(app)/components/ui/button'
import Link from 'next/link'
import { BackButton } from '@/app/(app)/components/back-button'

export default async function TestPage({
  params,
  searchParams,
}: {
  params: { slug: string[] }
  searchParams: { section: string; count: string; name: string }
}) {
  // const searchParams = useSearchParams()
  const section = searchParams.section // get section if in the query params
  const questionCount = searchParams.count
  const tableName = searchParams.name

  const [page, test, baseId, attemptId, ...props] = params.slug
  let sections: Array<{
    id: string
    name: string
    questionCount: number
    records?: Record<string, any>[]
  }> = []
  // TODO: call airtable read to fetch all tables from base
  const a = new Airtable({
    token: process.env.AIRTABLE_API_KEY_TEST!,
    baseId: baseId ?? 'apptppBpE0rStopjr',
  })

  if (page === 'test') {
    if (test === 'custom') {
      if (section && questionCount) {
        // TODO: if section is present get only record for specific section
        try {
          const table = await a.listTableRecords(section)
          sections = [
            {
              id: section,
              name: tableName,
              questionCount: Number(questionCount),
              records: table?.records,
            },
          ]

          console.log(sections, ':::single sections', table, ':::single table')
          // const base = await a.base(baseId)

          // console.log(base, ':::single base data')
          // const result = await Promise.allSettled(
          //   base['tables']?.map(async (table: any) => ({
          //     id: table?.id,
          //     name: table?.name,
          //     questionCount: await a.getAirtableRowCount(table?.name),
          //     records: (await a.listTableRecords(table?.id))?.records,
          //   })),
          // )
          // sections = result
          //   .map((res) => (res.status === 'fulfilled' ? res.value : undefined))
          //   .filter(Boolean)
        } catch (e: unknown) {
          if (e instanceof NoBaseIdError) {
            const base = await a.base(baseId ?? 'apptppBpE0rStopjr')
            console.log(base, ':::single base data retry')
            sections = base['tables']?.map((table: any) => ({
              id: table?.id,
              name: table?.name,
              questionCount: 30,
            }))
          } else {
            // Throw for all other errors
            throw e
          }
        }
      } else {
        try {
          const base = await a.base(baseId)

          console.log(base, ':::single base data')
          const result = await Promise.allSettled(
            base['tables']?.map(async (table: any) => ({
              id: table?.id,
              name: table?.name,
              questionCount: await a.getAirtableRowCount(table?.name),
              records: (await a.listTableRecords(table?.id))?.records,
            })),
          )
          sections = result
            .map((res) => (res.status === 'fulfilled' ? res.value : undefined))
            .filter(Boolean)
          //  sections = base['tables']?.map((table: any) => ({
          //   id: table?.id,
          //   name: table?.name,
          //   questionCount: 30,
          // }))
        } catch (e: unknown) {
          if (e instanceof NoBaseIdError) {
            const base = await a.base(baseId ?? 'apptppBpE0rStopjr')
            console.log(base, ':::single base data retry')
            sections = base['tables']?.map((table: any) => ({
              id: table?.id,
              name: table?.name,
              questionCount: 30,
            }))
          } else {
            // Throw for all other errors
            throw e
          }
        }
      }
    } else if (test === 'cnc') {
      try {
        const base = await a.base(baseId)

        const result = await Promise.allSettled(
          base['tables']?.map(async (table: any) => ({
            id: table?.id,
            name: table?.name,
            questionCount: 20,
            records: (await a.listTableRecords(table?.id, 20))?.records,
          })),
        )
        sections = result
          .map((res) => (res.status === 'fulfilled' ? res.value : undefined))
          .filter(Boolean)
      } catch (e: unknown) {
        // Throw for all other errors
        throw e
      }
    } else {
      try {
        const base = await a.base(baseId)

        const result = await Promise.allSettled(
          base['tables']?.map(async (table: any) => ({
            id: table?.id,
            name: table?.name,
            questionCount: 30,
            records: (await a.listTableRecords(table?.id, 30))?.records,
          })),
        )
        sections = result
          .map((res) => (res.status === 'fulfilled' ? res.value : undefined))
          .filter(Boolean)
      } catch (e: unknown) {
        // Throw for all other errors
        throw e
      }
    }
  }

  if (page === 'solution' && test && baseId && attemptId) {
    return (
      <Main className="flex flex-1 w-full flex-col gap-4">
        {/* Finish test component */}
        {page === 'solution' && test && baseId && attemptId && (
          <Question
            test={test as 'cnc' | 'custom' | 'nnpcl'}
            type="solution"
            sections={sections}
            // // @ts-ignore
            // records={records}
            attemptId={attemptId}
          />
          // <Solutions
          //   test={test}
          //   // sections={sections}
          //   // // @ts-ignore
          //   // records={records}
          //   attemptId={attemptId}
          // />
        )}
      </Main>
    )
  }

  const selectedTest = testTypes.find((t) => t.name === test)

  return (
    <Main className="flex flex-1 w-full flex-col gap-4">
      {/* Header section of test page */}
      {page === 'test' && test && baseId && !attemptId && (
        <Section className="grid gap-2 bg-blue-600/75 place-items-center">
          <div className="min-w-[620px] flex items-center justify-between">
            <BackButton />

            <div />
          </div>
        </Section>
      )}

      {/* test page entry, setting attemptId and starting test sections */}
      {page === 'test' && test && baseId && !attemptId && (
        <TestEntry
          title={section && questionCount && tableName ? tableName : selectedTest?.title ?? ''}
          description="Lorem ipsum ipsum ipsum ipsum ipsum ipsum ipsum ipsum ipsum ipsum ipsum ipsum ipsumipsum"
          sections={sections}
          totalQuestionCount={sections.reduce((p, c) => c.questionCount + p, 0)}
          attempts={2}
          step={section && questionCount && tableName ? 'entry' : 'sections'}
          attemptId={crypto.randomUUID()}
          quickStart={section && questionCount && tableName ? true : false}
        />
      )}
      {/* section page entry should never come up when question is present */}
      {/*test && (
        <SectionEntry
          section={
            sections.find((value) => value?.id === section) ?? {
              id: 'quantitative-reasoning',
              name: 'Quantitative Reasoning',
              questionCount: 30,
            }
          }
        />
      )*/}

      {/* Randomize tests presented to user */}
      {page === 'test' && test && baseId && attemptId && (
        <Question
          test={test as 'cnc' | 'custom' | 'nnpcl'}
          type="question"
          sections={sections}
          // // @ts-ignore
          // records={records}
          attemptId={attemptId}
          testDurationInMinutes={sections.reduce((p, c) => c.questionCount + p, 0) ?? 120}
        />
      )}
    </Main>
  )
}
