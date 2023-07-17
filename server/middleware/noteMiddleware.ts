import { NextFunction, Request, Response } from 'express';
import Note, { Note as INote } from '../models/Note';

const deleteUserRelatedNotes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.params.id;

    let deletedDoc: INote | null;
    do {
      deletedDoc = await Note.findOneAndDelete({ authorId: userId });
    } while (deletedDoc);

    next();
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const noteMiddleware = { deleteUserRelatedNotes };

export default noteMiddleware;
