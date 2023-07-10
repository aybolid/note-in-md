import express from 'express'
import cors from 'cors'

import authRouter from './routers/authRouter'
import errorHandler from './handlers/errorHandler'
import AppError from './utils/AppError'

const app = express()

app.use(cors()) // Allow Cross-Origin requests
app.use(express.json()) // Parse incoming requests with JSON payloads

// Routers
app.use('/api/auth', authRouter)

app.use('*', (_req, _res, next) => {
  const error = new AppError('Not Found', 404, 'Not Found')
  next(error)
})

app.use(errorHandler)

export default app
