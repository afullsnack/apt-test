import { TestEntry } from '@/app/(app)/components/test-entry'
import { Main, Section, Container } from '@app/components/craft'

export default async function TestPage({ params }: { params: { slug: string[] } }) {
  console.log(params.slug, ':::from page')
  const [test, section, number, ...props] = params.slug.slice(1)

  console.log(test, section, number, ':::test taker')

  return (
    <Main className="flex flex-1 w-full flex-col gap-4">
      <Section className="grid gap-2 bg-blue-600/75">
        <div />
      </Section>

      {/* test page entry */}
      {test && !section && !number && (
        <TestEntry
          title="All mighty test"
          description="Lorem ipsum ipsum ipsum ipsum ipsum ipsum ipsum ipsum ipsum ipsum ipsum ipsum ipsumipsum"
          sections={[
            {
              id: 1,
              name: 'Quantitative Reasoning',
              questionCount: 50,
            },
            {
              id: 2,
              name: 'Verbal Reasoning',
              questionCount: 50,
            },
            {
              id: 3,
              name: 'English',
              questionCount: 50,
            },
            {
              id: 4,
              name: 'Logic',
              questionCount: 50,
            },
          ]}
          totalQuestionCount={300}
          attempts={2}
        />
      )}

      {test && section && !number && <div>Section entry</div>}
    </Main>
  )
}
