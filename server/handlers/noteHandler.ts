import { NextFunction, Response, Request } from 'express';
import AppError from '../utils/AppError';
import { decodeToken } from '../utils/jwt';
import User from '../models/User';
import Note from '../models/Note';
import getTokenFromReq from '../utils/getTokenFromReq';

interface NoteBody {
  title: string;
  content: string;
  tags: string[];
}

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, content, tags } = req.body as NoteBody;
    if (!title || !content) {
      return next(
        new AppError('Title and content are required', 400, 'Bad Request')
      );
    }

    // ? todo validation

    const token = getTokenFromReq(req);
    if (!token) return;

    const decoded = decodeToken<{ id: string }>(token);
    const authorId = decoded.id;

    const author = await User.findOne({ _id: authorId });
    if (!author) {
      return next(
        new AppError('User with this ID does not exist', 400, 'Bad Request')
      );
    }

    const note = new Note({ title, content, authorId, tags });

    await note.save();
    return res.status(201).json({ message: 'Note created' });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const updateMy = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = getTokenFromReq(req);
    if (!token) return;

    const decoded = decodeToken<{ id: string }>(token);
    const authorId = decoded.id;

    const doc = await Note.findOneAndUpdate(
      { _id: req.params.id, authorId: authorId },
      { ...req.body, updatedAt: new Date().toISOString() },
      {
        new: true,
        runValidators: true,
      }
    );
    if (!doc) {
      return next(new AppError('Note not found', 404, 'Not Found'));
    }

    res.status(200).json({ status: 'Success', updatedNote: doc });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const getMyAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = getTokenFromReq(req);
    if (!token) return;

    const decoded = decodeToken<{ id: string }>(token);
    const authorId = decoded.id;

    const docs = await Note.find({ authorId: authorId });
    res.status(200).json({
      status: 'Success',
      results: docs ? docs.length : undefined,
      notes: docs || [],
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const getMyOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = getTokenFromReq(req);
    if (!token) return;

    const decoded = decodeToken<{ id: string }>(token);
    const authorId = decoded.id;

    const doc = await Note.findOne({ _id: req.params.id, authorId: authorId });
    if (!doc) {
      return next(new AppError('Note not found', 404, 'Not Found'));
    }

    res.status(200).json({ status: 'Success', note: doc });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const deleteMy = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = getTokenFromReq(req);
    if (!token) return;

    const decoded = decodeToken<{ id: string }>(token);
    const authorId = decoded.id;

    const doc = await Note.findOneAndDelete({
      _id: req.params.id,
      authorId: authorId,
    });
    if (!doc) {
      return next(new AppError('Note not found', 404, 'Not Found'));
    }

    res.status(200).json({ message: 'Note deleted' });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const noteHandler = { create, updateMy, getMyAll, getMyOne, deleteMy };
export default noteHandler;
