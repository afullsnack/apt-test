import { TestEntry } from '@app/components/test-entry'
import { SectionEntry } from '@app/components/test-section-entry'
import { Main, Section, Container } from '@app/components/craft'
import { Question } from '@app/components/test-questions'
import { Button } from '@app/components/ui/button'
import { FinishTest } from '@app/components/finish'
import { ConfirmCloseDialog } from '@/app/(app)/components/confirm-close-dialog'
import CountdownTimer from '@/app/(app)/components/countdown-timer'

export default async function TestPage({ params }: { params: { slug: string[] } }) {
  console.log(params.slug, ':::from page')
  const [test, section, question, ...props] = params.slug.slice(1)

  console.log(test, section, question, ':::test taker')

  return (
    <Main className="flex flex-1 w-full flex-col gap-4">
      {/* Header section of test page */}
      {test && section && !question && (
        <Section className="grid gap-2 bg-blue-600/75">
          <div />
        </Section>
      )}
      {test && section && question && (
        <Section className="!p-8 w-full border border-blue-300 flex items-center justify-between">
          <h1 className="text-3xl font-semibold capitalize">{section}</h1>
          {question !== 'finish' && (
            <>
              <CountdownTimer minutes={1} />
              <div className="flex items-center space-x-2">
                <span>Question {question} of 50</span>
                <ConfirmCloseDialog>
                  <Button variant="outline" size={'sm'}>
                    Close
                  </Button>
                </ConfirmCloseDialog>
              </div>
            </>
          )}
        </Section>
      )}

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
      {/* section page entry */}
      {test && section && !question && (
        <SectionEntry
          section={{
            id: 'quantitative-reasoning',
            name: 'Quantitative Reasoning',
            questionCount: 50,
          }}
        />
      )}

      {/* test page entry */}
      {test && section && question && question !== 'finish' && (
        <Question section={section} test={test} question={question} />
      )}
      {/* Finish test component */}
      {test && section && question && question === 'finish' && <FinishTest />}
    </Main>
  )
}
