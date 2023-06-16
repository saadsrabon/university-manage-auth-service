import { Model } from 'mongoose'

export type Iuser = {
  id: string
  role: string
  password: string
}

export type IGenericErrorMessage = {
  path: string | number
  message: string
}
export type IGenericErrorResponse = {
  statusCode: number
  message: string
  errorMessages: IGenericErrorMessage[]
}

export type UserModel = Model<Iuser, Record<string, unknown>>
