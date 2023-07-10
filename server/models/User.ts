import mongoose from 'mongoose'
import validator from 'validator'
// import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name'],
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      unique: [true, 'Email already exists'],
      validate: [validator.isEmail, 'Provide a valid email'],
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      select: false,
      minLength: [8, 'Password must be at least 8 characters'],
    },
    createdAt: {
      type: Date,
      default: Date.now,
      immutable: true,
    },
  },
  { versionKey: false }
)

export default mongoose.model('User', userSchema)
