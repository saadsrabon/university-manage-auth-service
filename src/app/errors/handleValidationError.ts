// we will make a genereice error for front end

import mongoose from 'mongoose'
import {
  IGenericErrorMessage,
  IGenericErrorResponse,
} from '../modules/user/user.interface'

// export const handleValidationError = (
//   error: mongoose.Error.ValidationError
// ): IGenericErrorResponse => {
//   const errorMessages: IGenericErrorMessage[] = Object.values(error.errors).map(
//     (err: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
//       return { path: err.path, message: err.message }
//     }
//   )

//   return {
//     statusCode: 400,
//     message: 'Validation Error',
//     errorMessages,
//   }
// }

export const handleValidationError = (
  error: mongoose.Error.ValidationError
): IGenericErrorResponse => {
  const errors: IGenericErrorMessage[] = Object.values(error.errors).map(
    (el: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: el?.path,
        message: el?.message,
      }
    }
  )
  const statusCode = 400
  return {
    statusCode,
    message: 'Validation Error',
    errorMessages: errors,
  }
}
