'use server'
import config from '@payload-config'
import { getPayload } from 'payload'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { cookies } from 'next/headers'

export async function getEmailsAndCompareCode(code: string, email?: string) {
  // const payload = await getPayloadHMR({ config })
  const _payload = await getPayload({ config })

  const data = await _payload.find({
    collection: 'users',
    where: {
      'access-code': { equals: code },
    },
  })

  if (data?.docs[0]['access-code']) {
    cookies().set('cbt_student_auth', data?.docs[0]['access-code'])
    return true
  }

  console.log(data, ':::data returned')
  return false
}
