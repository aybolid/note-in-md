import { NextFunction, Request, Response } from 'express'
import bcryptjs from 'bcryptjs'
import User from '../models/User'
import AppError from '../utils/AppError'
import createJWT from '../utils/createJWT'

interface SignupBody {
  name: string
  email: string
  password: string
  passwordConfirm: string
}

interface LoginBody {
  email: string
  password: string
}

const signup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, password, passwordConfirm } = req.body as SignupBody
    if (!name || !email || !password || !passwordConfirm) {
      return next(
        new AppError('Provide all required fields (name, email, password, passwordConfirm)', 400, 'Bad Request')
      )
    }
    if (password !== passwordConfirm) {
      return next(new AppError('Passwords do not match', 400, 'Bad Request'))
    }

    const candidate = await User.findOne({ email })
    if (candidate) {
      return next(new AppError('User with this email already exists', 400, 'Bad Request'))
    }

    const hashPassword = bcryptjs.hashSync(password, 7)
    const user = new User({ name, email, password: hashPassword })

    await user.save()
    return res.status(201).json({ message: 'User created' })
  } catch (err) {
    console.log(err)
    return next(err)
  }
}

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body as LoginBody
    if (!email || !password) {
      return next(new AppError('Provide all required fields (email, password)', 400, 'Bad Request'))
    }

    const user = await User.findOne({ email }).select('+password')
    if (!user) {
      return next(new AppError('User with this email does not exist', 400, 'Bad Request'))
    }

    const isPasswordCorrect = bcryptjs.compareSync(password, user.password as string)
    if (!isPasswordCorrect) {
      return next(new AppError('Wrong password', 400, 'Bad Request'))
    }

    const token = createJWT(user._id.toString())
    user.password = undefined

    return res.status(200).json({ message: 'User logged in', token, user })
  } catch (err) {
    console.log(err)
    return next(err)
  }
}

const authHandler = { signup, login }

export default authHandler
