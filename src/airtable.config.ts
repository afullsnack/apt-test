const config = {
  base: async () => {
    await fetch(`https://api.airtable.com/v0/appJcCgdcLSGKwXHP`, {
      headers: { Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}` },
    })
      .then(async (res) => await res.json())
      .catch((err) => console.log(err, ':::error querying airtable base'))
  },
}

export default config
