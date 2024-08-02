// settings page to handle profile pic upload, name and email change
import { Container, Main, Section } from '@app/components/craft'

export default function Settings() {
  return (
    <Main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <Section className="!p-0 grid gap-2">
        <div className="flex items-center">
          <h1 className="text-lg font-semibold md:text-xl">Details</h1>
        </div>
        <Container className="!p-0 grid gap-2 w-full flex-1">
          <h1>Details</h1>
        </Container>
      </Section>
    </Main>
  )
}

const PasswordSection = () => {
  // return form with handler to server actions
  return (
    <Container>
      <div>Form</div>
    </Container>
  )
}
