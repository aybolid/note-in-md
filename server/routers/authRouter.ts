import { Router } from 'express'
import authHandler from '../handlers/authHandler'

const r = Router()

r.post('/signup', authHandler.signup)
r.post('/login', authHandler.login)

export default r
