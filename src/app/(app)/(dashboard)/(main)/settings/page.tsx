// 'use client'
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
import { Suspense } from 'react'
import { cookies } from 'next/headers'
import { AccountSection } from './components/account'

export default function Settings() {
  const code = cookies().get('cbt_student_auth')?.value
  return (
    <Main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <Suspense fallback={'Fetching user data...'}>
        <AccountSection code={code!} />
      </Suspense>
      {/* <PasswordChange /> */}
    </Main>
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
