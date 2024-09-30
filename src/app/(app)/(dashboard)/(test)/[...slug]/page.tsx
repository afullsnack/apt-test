import { TestEntry } from '@app/components/test-entry'
import { SectionEntry } from '@app/components/test-section-entry'
import { Main, Section, Container } from '@app/components/craft'
import { Question } from '@app/components/test-questions'
import { Button } from '@app/components/ui/button'
import crypto from 'node:crypto'

import { Airtable, NoBaseIdError } from '@/airtable.config'
import React from 'react'
import { Solutions } from '@app/components/test-solutions'
import { notFound } from 'next/navigation'

export default async function TestPage({ params }: { params: { slug: string[] } }) {
  const [page, test, attemptId, ...props] = params.slug
  let sections: Array<any> = []
  let records: Record<string, any>[] = []
  // TODO: call airtable read to fetch all tables from base
  const a = new Airtable({ token: process.env.AIRTABLE_API_KEY_TEST!, baseId: 'apptppBpE0rStopjr' })

  if (page === 'test') {
    // try getting all tables
    try {
      const base = await a.base('apptppBpE0rStopjr')

      console.log(base, ':::single base data')
      sections = base['tables']?.map((table: any) => ({
        id: table?.id,
        name: table?.name,
        questionCount: 30,
      }))
    } catch (e: unknown) {
      if (e instanceof NoBaseIdError) {
        const base = await a.base('apptppBpE0rStopjr')
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

    if (sections.length) {
      try {
        // pass in section as tableId
        for (const section of sections) {
          const table = await a.listTableRecords(section?.id, 'apptppBpE0rStopjr')
          // @ts-ignore
          records = [...records, ...table?.records]
        }

        // @ts-ignore
        console.log(records.length, ':::length of records')
      } catch (e: unknown) {
        if (e instanceof NoBaseIdError) {
          // retry with baseId
          for (const section of sections) {
            const table = await a.listTableRecords(section?.id, 'apptppBpE0rStopjr')
            // @ts-ignore
            records = [...records, ...table?.records]
          }
          // @ts-ignore
          console.log(records.length, ':::record legnth')
        } else {
          console.log(e, ':::error when fetching records')
          throw e
        }
      }
    }
  }


  // TODO: handle practice page
  if (page === 'practice') {
    return (
      <Main className="flex flex-1 w-full flex-col gap-4">
        <h1>Pick practice questions</h1>
      </Main>
    )
  }

  if (page === 'solution') {
    return (
      <Main className="flex flex-1 w-full flex-col gap-4">
        {/* Finish test component */}
        {page === 'solution' && test && attemptId && (
          <Solutions
            test={test}
            // sections={sections}
            // // @ts-ignore
            // records={records}
            attemptId={attemptId}
          />
        )}
      </Main>
    )
  }

  return (
    <Main className="flex flex-1 w-full flex-col gap-4">
      {/* Header section of test page */}
      {page === 'test' && test && !attemptId && (
        <Section className="grid gap-2 bg-blue-600/75">
          <div />
        </Section>
      )}

      {/* test page entry, setting attemptId and starting test sections */}
      {page === 'test' && test && !attemptId && (
        <TestEntry
          title="Mock Test"
          description="Lorem ipsum ipsum ipsum ipsum ipsum ipsum ipsum ipsum ipsum ipsum ipsum ipsum ipsumipsum"
          sections={sections}
          totalQuestionCount={120}
          attempts={2}
          attemptId={crypto.randomUUID()}
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
      {page === 'test' && test && attemptId && (
        <Question
          test={test}
          sections={sections}
          // @ts-ignore
          records={records}
          attemptId={attemptId}
        />
      )}
    </Main>
  )
}
