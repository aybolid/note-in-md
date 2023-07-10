import { ErrorRequestHandler, NextFunction, Request, Response } from 'express'
import AppError from '../utils/AppError'
import { Error } from 'mongoose'

const errorHandler: ErrorRequestHandler = (
  err: AppError | Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.log(err)
  res.status((err as AppError).statusCode || 500).json(err)
}

export default errorHandler
