import { Main, Section, Container } from '@app/components/craft'
import { TestCard } from '@app/components/ui/test-card'
import { TestScoreChart } from '@app/components/score-radial-chart'
import { PerformanceChart } from '@app/components/performance-area-chart'
import { Button } from '@/app/(app)/components/ui/button'
import Link from 'next/link'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import config from '@payload-config'

export default async function Test() {
  const payload = await getPayloadHMR({ config })
  // TODO: find all sections and render

  return (
    <Main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <Section className="!p-0 grid gap-2">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold md:text-xl">Sample questions</h1>
          <Link href="/test/mock-test" passHref>
            <Button>Take Mock Test</Button>
          </Link>
        </div>
        <Container className="!p-0 !mx-0 !max-w-full grid grid-cols-3 gap-2 w-full flex-1">
          <Link href={'https://nukleus-gg.gitbook.io/aptitude-test-docs'} passHref>
            <TestCard
              title="Quantitative Reasoning/Mathematics"
              description="Short description of the section"
              testCount={50}
              questionsCount={30}
            />
          </Link>
          <Link
            href={
              'https://nukleus-gg.gitbook.io/aptitude-test-docs/questions/verbal-reasoning-english'
            }
            passHref
          >
            <TestCard
              title="Verbal Reasoning/English"
              description="Short description of the section"
              testCount={50}
              questionsCount={30}
            />
          </Link>
          <Link
            href={
              'https://nukleus-gg.gitbook.io/aptitude-test-docs/questions/general-knowledge-physics-chemistry-ict'
            }
            passHref
          >
            <TestCard
              title="General Knowledge (Physics, Chemistry, ICT)"
              description="Short description of the section"
              testCount={50}
              questionsCount={30}
            />
          </Link>
        </Container>
      </Section>
    </Main>
  )
}
