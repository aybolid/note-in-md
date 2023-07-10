import 'dotenv/config'
import mongoose from 'mongoose'
import app from './app'

const DB = process.env.MONGODB_URL!.replace('<password>', process.env.MONGODB_PASSWORD!)
mongoose
  .connect(DB)
  .then(() => console.log('Connected to DB'))
  .catch((err) => console.log(err))

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
