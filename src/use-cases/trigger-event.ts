// @trigger plunk event to send email template to user

export const triggerEvent = async ({
  email,
  eventName,
  metadata,
}: {
  email: string
  eventName: string
  metadata?: Record<string, any>
}): Promise<any> => {
  try {
    const TRACK_URL = `${process.env.PLUNK_API_URL}/v1/track`

    const response = await fetch(TRACK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.PLUNK_SECRET_TOKEN}`,
      },
      body: JSON.stringify({
        event: eventName,
        email,
        data: metadata,
      }),
    })

    console.log(response, ':::trigger plunk event endpoint call')
  } catch (err: any) {
    console.log(err, ':::plunk event trigger')
    throw new Error('request could not be completed')
  }
}
