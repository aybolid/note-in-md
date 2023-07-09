import 'dotenv/config'

import app from './app'

const PORT = process.env.PORT || 3000
console.log('PORT: ', PORT);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION!!! Shutting down...')
  console.log(err)

  process.exit(1)
})
