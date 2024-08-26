import { AccountForm } from './account-form'
import config from '@payload-config'
import { Container, Main, Section } from '@app/components/craft'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { Avatar } from './avatar'

export const AccountSection = async ({ code }: { code: string }) => {
  const payload = await getPayloadHMR({ config })

  const { docs } = await payload.find({
    collection: 'users',
    where: {
      'access-code': { equals: code },
    },
  })

  const user = docs[0]

  console.log(user, ':::setting user')

  return (
    <>
      <Avatar email={user?.email} />
      <AccountForm email={user?.email} fullName={user['full-name']!} />
    </>
  )
}
