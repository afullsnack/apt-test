// 'use server'

import { getPayload } from 'payload'
import config from '@payload-config'
import { Container, Main, Section } from '@app/components/craft'
import Avvvatars from 'avvvatars-react'

export const Avatar = async ({ email }: { email: string }) => {
  // console.log(code, ':::code dfined')
  // const payload = await getPayload({ config })

  // const { docs } = await payload.find({
  //   collection: 'users',
  //   where: {
  //     'access-code': { equals: code },
  //   },
  // })

  // const user = docs[0]

  return (
    <Section className="!p-0 grid gap-2">
      <div className="flex items-center">
        <Avvvatars size={64} radius={10} value={email} shadow={true} style="shape" />
      </div>
    </Section>
  )
}
