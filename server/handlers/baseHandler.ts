import { NextFunction, Request, Response } from 'express'
import { Model } from 'mongoose'
import AppError from '../utils/AppError'

import { User } from '../models/User'
import APIFeatures from '../utils/APIFeatures'

type Models = User

const getAll = (Model: Model<Models>) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    const features = new APIFeatures(Model.find(), req.query).sort().paginate().limitFields()
    const docs = await features.query

    res.status(200).json({
      status: 'Success',
      results: docs.length,
      documents: docs,
    })
  } catch (err) {
    next(err)
  }
}

const getOne = (Model: Model<Models>) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    const doc = await Model.findById(req.params.id)

    if (!doc) {
      return next(new AppError('No document found with that ID', 404, 'Bad Request'))
    }

    res.status(200).json({
      status: 'Success',
      document: doc,
    })
  } catch (err) {
    next(err)
  }
}

const deleteOne = (Model: Model<Models>) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    const doc = await Model.findByIdAndDelete(req.params.id)
    if (!doc) {
      return next(new AppError('No document found with that ID', 404, 'Bad Request'))
    }

    res.status(204).json({
      status: 'Success',
    })
  } catch (err) {
    next(err)
  }
}

const updateOne = (Model: Model<Models>) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

    if (!doc) {
      return next(new AppError('No document found with that ID', 404, 'Bad Request'))
    }

    res.status(200).json({
      status: 'Success',
      patchedDocument: doc,
    })
  } catch (err) {
    next(err)
  }
}

const createOne = (Model: Model<Models>) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    const doc = await Model.create(req.body)

    res.status(201).json({
      status: 'Success',
      createdDocument: doc,
    })
  } catch (err) {
    next(err)
  }
}

export default { getAll, getOne, deleteOne, updateOne, createOne }
