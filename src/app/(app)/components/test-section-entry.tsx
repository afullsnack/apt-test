'use client'

import { usePathname, useRouter } from 'next/navigation'
import { Section, Container } from '@app/components/craft'
import { TestSection } from './test-entry'
import { CircleAlert } from 'lucide-react'
import { Button } from './ui/button'

type Args = {
  section: TestSection
}
// return component that handles
// the render of section for test
export const SectionEntry = ({ section }: Args) => {
  const router = useRouter()
  const pathname = usePathname()
  console.log(pathname, ':::pathname in section component')

  return (
    <Section className="grid w-full place-items-center px-32">
      <Container className="bg-background border border-border min-w-[620px] dark:bg-foreground flex flex-col p-8 items-center justify-center space-y-6">
        <div className="grid gap-2 place-items-center">
          <h1 className="font-bold text-xl text-center">{section.name}</h1>
          <span>{section.questionCount} Questions</span>
        </div>
        <div className="p-4 w-full bg-muted-foreground/25 rounded-sm">
          <p className="flex items-center gap-2 mb-6">
            <CircleAlert className="w-4 h-4" />
            Instructions
          </p>
          <ul className="list-disc ml-10">
            {[
              'Choose a quiet and comfortable setting for taking the test where interruptions are unlikely. Make sure that your environment is devoid of any distractions to help keep your focus during the entire test.',
              'Ensure that your computer and internet connection are functioning correctly. Access the test using a reliable and updated web browser.',
              'Once initiated, the timed test cannot be paused. Be ready to go through the entire session without taking breaks.',
              'Read each question thoroughly along with all provided answer choices before making your selection. Remember, there are no penalties for wrong answers.',
              'Manage your time wisely to ensure that you can attempt each question within the allotted time.',
            ].map((inx, index) => (
              <li key={index}>{inx}</li>
            ))}
          </ul>
        </div>
        <Button
          onClick={() => {
            router.prefetch(`${pathname}/start`)
            router.push(`${pathname}/start`)
          }}
        >
          Start test
        </Button>
      </Container>
    </Section>
  )
}
