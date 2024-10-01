"use client";

import { Main, Section, Container } from '@app/components/craft'
import { TestCard } from '@app/components/ui/test-card'
// import { TestScoreChart } from '@app/components/score-radial-chart'
// import { PerformanceChart } from '@app/components/performance-area-chart'
import { Button } from '@/app/(app)/components/ui/button'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@app/components/ui/card'
import { testTypes } from '@app/lib/utils'
import { ToggleGroup, ToggleGroupItem } from '@app/components/ui/toggle-group'
import { useState } from 'react';
// import { getPayloadHMR } from '@payloadcms/next/utilities'
// import config from '@payload-config'


export default function Test() {
  // const payload = await getPayloadHMR({ config })
  // TODO: find all sections and render


  const [test, setTest] = useState<string>();
  return (
    <Main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <Section className="!p-0 grid gap-2">
        <div className="flex items-center justify-center">
          <h1 className="text-lg font-semibold text-center md:text-xl border-b-[3px] border-b-[#1FA1E0] px-8">Select Test</h1>
          {/*<Link href="/test/select-test" passHref>
            <Button>Take Mock Test</Button>
          </Link>*/}
        </div>
        <Container className="!p-0 grid gap-2 w-full flex-1 !max-w-full">
          <ToggleGroup type="single" className='grid gap-2 w-full border border-red-400 h-auto' onValueChange={value => setTest(value)}>
            {
              testTypes.map((test) => {
                return (
                  <ToggleGroupItem value={test.baseId} key={test.baseId} className='h-auto !max-w-full'>
                    <Card>
                      <CardContent>
                        <CardHeader>
                          <CardTitle>{test.name}</CardTitle>
                        </CardHeader>
                        <div>
                          <span>{test.description}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </ToggleGroupItem>
                )
              })
            }
          </ToggleGroup>

          <Button onClick={() => { }}>Start Test</Button>
          {/*<Link href={'https://nukleus-gg.gitbook.io/aptitude-test-docs'} passHref>
            <TestCard
              title="Quantitative Reasoning/Mathematics"
              description="Quantitative reasoning is the ability to interpret, analyze, and draw conclusions from numerical data and mathematical relationships. It involves applying mathematical concepts and logical thinking to solve real-world problems and make informed decisions based on quantitative information."
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
              description="Verbal reasoning is the ability to understand, analyze, and evaluate written or spoken language. It involves comprehending complex text, drawing logical inferences, recognizing relationships between ideas, and constructing well-structured arguments based on given information."
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
              description="General Knowledge in Physics, Chemistry, and ICT refers to a broad understanding of fundamental concepts, principles, and recent developments in these fields"
              testCount={50}
              questionsCount={30}
            />
          </Link>
          <Link href={'https://nukleus-gg.gitbook.io/aptitude-test-docs/questions/logic'} passHref>
            <TestCard
              title="Logic"
              description="Logic, in academic parlance, is the systematic study of valid reasoning and inference. It involves the analysis of arguments, the formalization of reasoning patterns, and the development of methods for distinguishing between valid and invalid conclusions. Logic encompasses formal systems of deduction, induction, and abduction, and serves as a foundational discipline in philosophy, mathematics, computer science, and linguistics."
              testCount={50}
              questionsCount={30}
            />
          </Link>*/}
        </Container>
      </Section>
    </Main>
  )
}
