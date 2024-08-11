import { Main, Section, Container } from '@app/components/craft'
import { TestCard } from '@app/components/ui/test-card'
import { TestScoreChart } from '@app/components/score-radial-chart'
import { PerformanceChart } from '@app/components/performance-area-chart'
import { Button } from '@/app/(app)/components/ui/button'

export default function Test() {
  return (
    <Main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <Section className="!p-0 grid gap-2">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold md:text-xl">Sample questions</h1>
          <Button>Take Mock Test</Button>
        </div>
        <Container className="!p-0 !mx-0 !max-w-full grid grid-cols-3 gap-2 w-full flex-1">
          {Array.from({ length: 6 }).map((_, i) => (
            <TestCard
              key={i}
              title="All Mighty Test"
              description="Numerical reasoning tests demonstrate your ability to deal with numbers quickly and accurately. These tests contain questions that..."
              testCount={50}
              questionsCount={520}
            />
          ))}
        </Container>
      </Section>
    </Main>
  )
}
