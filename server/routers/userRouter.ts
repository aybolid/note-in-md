import { RequestHandler, Router } from 'express'
import authHandler from '../handlers/authHandler'
import userHandler from '../handlers/userHandler'

const r = Router()

r.post('/signup', authHandler.signup)
r.post('/login', authHandler.login)

r.use(authHandler.protect)

// todo r.delete('/delete-me', userHandler.deleteMe);

r.use(authHandler.restrictTo('admin'))

r.get('/', userHandler.getAllUsers)

r.route('/:id').get(userHandler.getUser).delete(userHandler.deleteUser).patch(userHandler.updateUser)

export default r
