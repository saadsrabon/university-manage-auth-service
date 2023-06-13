import { Model, Schema, model } from 'mongoose'
import { Iuser } from './user.interface'

type UserModel = Model<Iuser, object>

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
