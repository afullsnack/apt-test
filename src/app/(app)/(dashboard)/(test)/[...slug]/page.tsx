import { Main, Section, Container } from '@app/components/craft'

export default async function TestPage({ params }: { params: { slug: string[] } }) {
  console.log(params.slug, ':::from page')
  const [test, section, number, ...props] = params.slug.slice(1)

  return (
    <Main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <Section className="!p-0 grid gap-2">
        <div className="flex items-center">
          <h1 className="text-lg font-semibold md:text-xl">Overview</h1>
        </div>
        <Container className="!p-0 grid gap-2 w-full flex-1">
          <h1>Test entry page</h1>
          <span>
            {test && `/${test}`}
            {section && `/${section}`}
            {number && `/${number}`}
            {props && `/${props.join('/')}`}
          </span>
        </Container>
      </Section>
    </Main>
  )
}
