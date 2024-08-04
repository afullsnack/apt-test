'use client'

import { usePathname, useRouter } from 'next/navigation'
import { Section, Container } from '@app/components/craft'

// return component that handles
// the render of section for test
export const SectionEntry = () => {
  const router = useRouter()
  const pathname = usePathname()

  return (
    <Section className="grid w-full place-items-center">
      <Container className="bg-background border border-border max-w-[620px] dark:bg-foreground flex flex-col p-8 items-center justify-center space-y-6">
        <div></div>
      </Container>
    </Section>
  )
}
