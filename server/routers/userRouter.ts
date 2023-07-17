import { Router } from 'express';
import authHandler from '../handlers/authHandler';
import userHandler from '../handlers/userHandler';
import noteMiddleware from '../middleware/noteMiddleware';

const r = Router();

r.post('/signup', authHandler.signup);
r.post('/login', authHandler.login);
r.get('/login/token', authHandler.loginWithToken);

r.use(authHandler.protect);

// todo r.delete('/delete-me', userHandler.deleteMe);

r.use(authHandler.restrictTo('admin'));

r.get('/', userHandler.getAllUsers);

r.route('/:id')
  .get(userHandler.getUser)
  .delete(noteMiddleware.deleteUserRelatedNotes, userHandler.deleteUser)
  .patch(userHandler.updateUser);

export default r;
