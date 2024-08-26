'use server'
import config from '@payload-config'
import { getPayload } from 'payload'
import crypto from 'node:crypto'

export async function resendCode(email?: string) {
  try {
    const _payload = await getPayload({ config })

    const data = await _payload.find({
      collection: 'users',
      where: {
        email: { equals: email },
      },
    })

    if (!data?.docs.length) {
      return false
    }

    if (
      data?.docs.length &&
      (!data?.docs[0]['access-code'] || !data?.docs[0]['access-code']?.length)
    ) {
      const code = generateHexCode().toUpperCase()
      console.log(code, ':::gen code')

      await _payload.update({
        collection: 'users',
        where: { email: { equals: email } },
        data: { 'access-code': code },
      })
      // Send code
      const info = await sendMail(email!, code)
      // transporter.sendMail({
      //   from: 'hello@ruco.tech',
      //   to: email,
      //   subject: 'Your Ruco Tech CBT Access Code',
      //   text: `Your access code is: ${}`,
      //   html: `<b>Your access code is: ${data?.docs[0]['access-code']}</b>`,
      // })

      console.log(info.response, info, ':::mail info')

      console.log(data, ':::data returned')
      return true
    }

    // Send code
    const info = await sendMail(email!, data?.docs[0]['access-code']!)

    //   transporter.sendMail({
    //   from: 'hello@ruco.tech',
    //   to: email,
    //   subject: 'Your Ruco Tech CBT Access Code',
    //   text: `Your access code is: ${data?.docs[0]['access-code']}`,
    //   html: `<b>Your access code is: ${data?.docs[0]['access-code']}</b>`,
    // })

    console.log(info.response, info, ':::mail info')

    console.log(data, ':::data returned')
    return true
  } catch (error: any) {
    console.log(error, ':::error sending code')

    return false
  }
}

function generateHexCode(): string {
  return crypto.randomBytes(3).toString('hex')
}

const sendMail = async (email: string, code: string) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.PLUNK_SECRET_KEY}`,
    },
    body: JSON.stringify({
      to: email,
      subject: 'Your Ruco Tech CBT Access Code',
      body: `<b>Your access code is: ${code}</b>`,
      subscribed: true,
      // from: 'hello@ruco.tech',
    }),

    // '{"to":"<string>","subject":"<string>","body":"<string>","subscribed":true,"name":"<string>","from":"<string>","reply":"<string>","headers":{}}'
  }

  return await fetch('https://api.useplunk.com/v1/send', options)
    .then((response) => response.json())
    .then((response) => {
      console.log(response)
      return response
    })
    .catch((err) => console.error(err, ':::error sending plunk mail'))
}
