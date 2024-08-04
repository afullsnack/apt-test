import { TestEntry } from '@app/components/test-entry'
import { SectionEntry } from '@app/components/test-section-entry'
import { Main, Section, Container } from '@app/components/craft'

export default async function TestPage({ params }: { params: { slug: string[] } }) {
  console.log(params.slug, ':::from page')
  const [test, section, question, ...props] = params.slug.slice(1)

  console.log(test, section, question, ':::test taker')

  return (
    <Main className="flex flex-1 w-full flex-col gap-4">
      <Section className="grid gap-2 bg-blue-600/75">
        <div />
      </Section>

      {/* test page entry */}
      {test && !section && !question && (
        <TestEntry
          title="All mighty test"
          description="Lorem ipsum ipsum ipsum ipsum ipsum ipsum ipsum ipsum ipsum ipsum ipsum ipsum ipsumipsum"
          sections={[
            {
              id: 'quantitative-reasoning',
              name: 'Quantitative Reasoning',
              questionCount: 50,
            },
            {
              id: 'verbal-reasoning',
              name: 'Verbal Reasoning',
              questionCount: 50,
            },
            {
              id: 'english',
              name: 'English',
              questionCount: 50,
            },
            {
              id: 'logic',
              name: 'Logic',
              questionCount: 50,
            },
          ]}
          totalQuestionCount={300}
          attempts={2}
        />
      )}

      {test && section && !question && (
        <SectionEntry
          section={{
            id: 'quantitative-reasoning',
            name: 'Quantitative Reasoning',
            questionCount: 50,
          }}
        />
      )}
    </Main>
  )
}
