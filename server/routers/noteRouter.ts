import { Router } from 'express';
import authHandler from '../handlers/authHandler';
import noteHandler from '../handlers/noteHandler';

const r = Router();

r.use(authHandler.protect);

r.post('/create', noteHandler.create);
r.patch('/update-my/:id', noteHandler.updateMy);
r.get('/get-my', noteHandler.getMyAll);
r.get('/get-my/:id', noteHandler.getMyOne);
r.delete('/delete-my/:id', noteHandler.deleteMy);

export default r;
