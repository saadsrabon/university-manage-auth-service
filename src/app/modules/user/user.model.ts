import { Schema, model } from 'mongoose'
import { Iuser, UserModel } from './user.interface'

const userSchema = new Schema<Iuser>(
  {
    id: {
      type: String,

      unique: true,
    },
    role: {
      type: String,
      required: true,
    },
    password: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)

export const UsersModel = model<Iuser, UserModel>('User', userSchema)
