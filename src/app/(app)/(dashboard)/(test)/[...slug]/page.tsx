import { TestEntry } from '@app/components/test-entry'
import { SectionEntry } from '@app/components/test-section-entry'
import { Main, Section, Container } from '@app/components/craft'
import { Question } from '@app/components/test-questions'
import { Button } from '@app/components/ui/button'
import { FinishTest } from '@app/components/finish'

import { Airtable, NoBaseIdError } from '@/airtable.config'
import React from 'react'

export default async function TestPage({ params }: { params: { slug: string[] } }) {
  console.log(params.slug, ':::from page')
  const [test, section, question, ...props] = params.slug.slice(1)
  let sections: Array<any>
  let records: Record<string, any>[]

  console.log(test, section, question, ':::test taker')
  // TODO: call airtable read to fetch all tables from base
  const a = new Airtable({ token: process.env.AIRTABLE_API_KEY_TEST!, baseId: 'apptppBpE0rStopjr' })

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

  console.log(section, params, ':::section')
  if (section) {
    console.log('<<<<<<Inside get all records>>>>>>>>>')
    try {
      // pass in section as tableId
      const table = await a.listTableRecords(section, 'apptppBpE0rStopjr')
      console.log(table, '::::table records', table?.records?.length)
      records = table?.records
    } catch (e: unknown) {
      if (e instanceof NoBaseIdError) {
        // retry with baseId
        const table = await a.listTableRecords(section, 'apptppBpE0rStopjr')
        records = table?.records
        console.log(table, '::::retry table records', table?.records?.length)
      } else {
        console.log(e, ':::error when fetching records')
        throw e
      }
    }
  }

  return (
    <Main className="flex flex-1 w-full flex-col gap-4">
      {/* Header section of test page */}
      {test && section && !question && (
        <Section className="grid gap-2 bg-blue-600/75">
          <div />
        </Section>
      )}

      {/* test page entry */}
      {test && !section && !question && (
        <TestEntry
          title="Mock Test"
          description="Lorem ipsum ipsum ipsum ipsum ipsum ipsum ipsum ipsum ipsum ipsum ipsum ipsum ipsumipsum"
          sections={sections}
          totalQuestionCount={120}
          attempts={2}
        />
      )}
      {/* section page entry */}
      {test && section && !question && (
        <SectionEntry
          section={
            sections.find((value) => value?.id === section) ?? {
              id: 'quantitative-reasoning',
              name: 'Quantitative Reasoning',
              questionCount: 30,
            }
          }
        />
      )}

      {/* test page entry */}
      {/* Randomize tests presented to user */}
      {test && section && question && question !== 'finish' && (
        <Question
          section={section}
          sectionName={sections?.find((value) => value?.id === section)?.name}
          test={test}
          question={question}
          // @ts-ignore
          records={records}
        />
      )}
      {/* Finish test component */}
      {test && section && question && question === 'finish' && <FinishTest />}
    </Main>
  )
}
