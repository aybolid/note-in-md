import { NextFunction, Request, Response } from 'express'
import bcryptjs from 'bcryptjs'
import validator from 'validator'
import User, { User as TUser } from '../models/User'
import AppError from '../utils/AppError'
import { createToken, decodeToken } from '../utils/jwt'

interface SignupBody {
  name: string
  email: string
  password: string
  passwordConfirm: string
  role?: 'admin' | 'user' | (string & {})
}

const signup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, password, passwordConfirm, role } = req.body as SignupBody
    if (!name || !email || !password || !passwordConfirm) {
      return next(new AppError('Provide all required fields', 400, 'Bad Request'))
    }
    if (!validator.isEmail(email)) {
      return next(new AppError('Provide a valid email', 400, 'Bad Request'))
    }
    if (password.length < 6) {
      return next(new AppError('Password must be at least 6 characters long', 400, 'Bad Request'))
    }
    if (password !== passwordConfirm) {
      return next(new AppError('Passwords do not match', 400, 'Bad Request'))
    }

    const candidate = await User.findOne({ email })
    if (candidate) {
      return next(new AppError('User with this email already exists', 400, 'Bad Request'))
    }

    const hashPassword = bcryptjs.hashSync(password, 7)
    const user = new User({ name, email, password: hashPassword, role })

    await user.save()
    return res.status(201).json({ message: 'User created' })
  } catch (err) {
    console.log(err)
    return next(err)
  }
}

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body as {
      email: string
      password: string
    }
    if (!email || !password) {
      return next(new AppError('Provide all required fields', 400, 'Bad Request'))
    }

    const user = await User.findOne({ email }).select('+password')
    if (!user) {
      return next(new AppError('User with this email does not exist', 400, 'Bad Request'))
    }

    const isPasswordCorrect = bcryptjs.compareSync(password, user.password as string)
    if (!isPasswordCorrect) {
      return next(new AppError('Wrong password', 400, 'Bad Request'))
    }

    const token = createToken(user._id.toString())
    const { password: _, ...safeUser } = user.toObject()

    return res.status(200).json({ message: 'User logged in', token, user: safeUser })
  } catch (err) {
    console.log(err)
    return next(err)
  }
}

const loginWithToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let token = ''
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1]
    }
    if (!token) return

    const decoded = decodeToken<{ id: string }>(token)

    const user = await User.findOne({ _id: decoded.id })
    if (!user) {
      return next(new AppError('User with this ID does not exist', 400, 'Bad Request'))
    }

    return res.status(200).json({ message: 'User logged in', user })
  } catch (err) {
    console.log(err)
    return next(err)
  }
}

interface ProtectedRequest extends Request {
  user: TUser
}

const protect = async (req: Request, _res: Response, next: NextFunction) => {
  try {
    let token = ''
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1]
    }
    if (!token) {
      return next(new AppError('You are not logged in', 401, 'Unauthorized'))
    }

    const decoded = decodeToken<{ id: string }>(token)

    const user = await User.findById(decoded.id)
    if (!user) {
      return next(new AppError('User with this token does not exist', 401, 'Unauthorized'))
    }

    ;(req as ProtectedRequest).user = user
    next()
  } catch (err) {
    console.log(err)
    return next(err)
  }
}

type roles = 'admin' | 'user' | (string & {})
const restrictTo = (...roles: roles[]) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!roles.includes((req as ProtectedRequest).user.role)) {
      return next(new AppError('You do not have permission to perform this action', 403, 'Forbidden'))
    }
    next()
  }
}

const authHandler = { signup, login, loginWithToken, protect, restrictTo }

export default authHandler
