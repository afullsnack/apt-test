import { Main, Section, Container } from '@app/components/craft'
// import { TestCard } from '@app/components/ui/test-card'
// import { TestScoreChart } from '@app/components/score-radial-chart'
// import { PerformanceChart } from '@app/components/performance-area-chart'
import { Button } from '@/app/(app)/components/ui/button'
import Link from 'next/link'
// import { getPayloadHMR } from '@payloadcms/next/utilities'
// import config from '@payload-config'
import { PracticeCard } from '@/app/(app)/components/ui/practice-card'
import { Airtable, NoBaseIdError } from '@/airtable.config'
import { baseIds } from '@/app/(app)/lib/utils'
import { Suspense } from 'react'

const getAllCustomSections = async () => {
  const a = new Airtable({
    token: process.env.AIRTABLE_API_KEY_TEST!,
    baseId: baseIds.custom,
  });

  try {
    const base = await a.base();

    console.log(base['tables'][0], ':::single table data');
    const result = await Promise.allSettled(base['tables']?.map(async (table: any) => ({
      id: table?.id,
      title: table?.name,
      count: (await a.getAirtableRowCount(table?.name)),
      href: '/'
    })));

    console.log(typeof result, ":::table type", result);
    const tables = result.map((res) => res.status === "fulfilled"? res.value : undefined);
    
    return tables.filter(Boolean);
  } catch (e: unknown) {
    if (e instanceof NoBaseIdError) {
      throw new Error(`No base with the ID: ${baseIds.custom}`);
    } else {
      // Throw for all other errors
      throw e
    }
  }

}


async function PracticeQuestions() {
  const tables = await getAllCustomSections();

  return (
    <Container className="!p-0 !mx-0 !max-w-full grid grid-cols-3 gap-2 w-full flex-1">
      {
        tables.map((sample: {
          title: string;
          description?: string;
          count: number;
          href: string;
        }) => (
          <Link passHref href={sample.href}>
            <PracticeCard title={sample.title} description={sample.description} questionsCount={sample.count} />
          </Link>
        ))
      }
    </Container>
  )
}

export default async function Test() {
  // const payload = await getPayloadHMR({ config })
  // TODO: find all sections and render

  return (
    <Main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <Section className="!p-0 grid gap-2">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold md:text-xl">Practice questions</h1>
          <Link href="/test/mock-test" passHref>
            <Button>Take Test</Button>
          </Link>
        </div>
        <Suspense fallback={
          <span>Loading practice questions...</span>
        }>
          <PracticeQuestions />
        </Suspense>
      </Section>
    </Main>
  )
}

