'use client'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@app/components/ui/form'
import { Input } from '@app/components/ui/input'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

// settings page to handle profile pic upload, name and email change
import { Container, Main, Section } from '@app/components/craft'
import { Button } from '@app/components/ui/button'
import Avvvatars from 'avvvatars-react'

export default function Settings() {
  return (
    <Main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <Avatar />
      <AccountSection />
      {/* <PasswordChange /> */}
    </Main>
  )
}

const Avatar = () => {
  return (
    <Section className="!p-0 grid gap-2">
      <div className="flex items-center">
        <Avvvatars size={64} value="John Doe" />
      </div>
    </Section>
  )
}

// define form schema
const formSchema = z.object({
  fullName: z.string().min(4, { message: 'A minimum of 2 characters is required' }).max(50),
  email: z.string().email({ message: 'Email must be provided' }),
})
const AccountSection = () => {
  // 1. define form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      email: '',
    },
  })
  // 2. define a submit handler.
  // TODO: Call server action on submit
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values, ':::account details change')
  }
  // return form with handler to server actions
  return (
    <Section className="!p-0 grid gap-2">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-xl">Details</h1>
      </div>
      <Container className="!p-0 grid gap-2 w-full flex-1">
        <h1>Details</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormDescription>Update your full name</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="email@ruco.com" {...field} />
                  </FormControl>
                  <FormDescription>Update your email address</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" size={'lg'}>
              Submit
            </Button>
          </form>
        </Form>
      </Container>
    </Section>
  )
}

const PasswordChange = () => {
  // return form with password change handler
  return (
    <Section>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-xl">Change password</h1>
      </div>
      <Container className="!p-0 grid gap-2 w-full flex-1">
        <h1>Update password</h1>
        <div>Password form</div>
      </Container>
    </Section>
  )
}
