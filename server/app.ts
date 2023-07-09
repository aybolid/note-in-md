import express from 'express'
import cors from 'cors'

import helloRoute from './routes/hello'

const app = express()

app.use(cors()) // Allow Cross-Origin requests
app.use(express.json()) // Parse incoming requests with JSON payloads

// Routes
app.use('/api', helloRoute)

export default app
