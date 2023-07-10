import 'dotenv/config'
import mongoose from 'mongoose'
import app from './app'

const dbUrl = process.env.MONGODB_URL
const password = process.env.MONGODB_PASSWORD

if (!dbUrl || !password) {
  throw new Error('Missing MONGODB_URL or MONGODB_PASSWORD in .env')
}

const DB = dbUrl.replace('<password>', password)
mongoose
  .connect(DB)
  .then(() => console.log('Connected to DB'))
  .catch((err) => console.log(err))

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
