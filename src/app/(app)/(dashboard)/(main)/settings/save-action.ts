'use server'
import config from '@payload-config'
import { getPayload } from 'payload'
import crypto from 'node:crypto'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'

export async function saveDetails(email?: string, fullName?: string) {
  try {
    const code = cookies().get('cbt_student_auth')?.value

    const _payload = await getPayload({ config })

    const data = await _payload.find({
      collection: 'users',
      where: {
        'access-code': { equals: code },
      },
    })

    if (!data?.docs.length) {
      console.log(data?.docs, ':::logged user')
      return false
    }

    const patched = await _payload.update({
      collection: 'users',
      where: {
        'access-code': { equals: code },
      },
      data: {
        email,
        'full-name': fullName,
      },
    })

    console.log(patched, ':::patched user')
    revalidatePath('/settings')
    return true
  } catch (error: any) {
    console.log(error, ':::save details error')
    return false
  }
}
