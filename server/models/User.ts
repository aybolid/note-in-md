import mongoose from 'mongoose';

export interface User extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  role: string;
}

const userSchema = new mongoose.Schema<User>(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name'],
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      select: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      immutable: true,
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },
  },
  { versionKey: false, collection: 'users' }
);

export default mongoose.model('User', userSchema, 'users');
