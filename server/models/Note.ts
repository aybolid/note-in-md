import mongoose, { mongo } from 'mongoose'

export interface Note extends mongoose.Document {
  title: string
  content: string | null
  createdAt: Date
  updatedAt: Date | null
  tags: string[]
  authorId: string
}

const noteSchema = new mongoose.Schema<Note>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
    },
    content: {
      type: String,
      default: null,
      required: false,
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      immutable: true,
    },
    updatedAt: {
      type: Date,
      default: null,
    },
    tags: {
      type: [String],
      default: [],
      required: false,
      trim: true,
    },
    authorId: {
      type: String,
      required: true,
      immutable: true,
    },
  },
  { versionKey: false, collection: 'notes' }
)

export default mongoose.model<Note>('Note', noteSchema)
