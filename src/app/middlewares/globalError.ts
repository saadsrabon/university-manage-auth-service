import { ErrorRequestHandler } from 'express'
import config from '../../config'

import { handleValidationError } from '../errors/handleValidationError'

import ApiError from '../errors/ApiError'
import { ZodError } from 'zod'
import { IGenericErrorMessage } from '../modules/user/user.interface'
import handleZodError from '../errors/handleZodError'

const golbalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  let statusCode = 500
  let message = 'Something went wrong'
  let errorMessages: IGenericErrorMessage[] = []

  if (error.name === 'ValidationError') {
    // we will make a genereice error for front end
    // take out the messages from the error object
    const simplifiedError = handleValidationError(error)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message

    errorMessages = simplifiedError.errorMessages
  } else if (error instanceof ZodError) {
    const simplifiedError = handleZodError(error)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message

    errorMessages = simplifiedError.errorMessages
  }

  // else if(err instanceof Error) {
  //  message = err?.message
  //   errorMessages=err?.message?
  //   [
  //     {
  //       path:'',
  //       message:err?.message
  //     }
  //   ]
  //   :[];
  // }
  else if (error instanceof ApiError) {
    statusCode = error?.statusCode
    message = error.message
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : []
  } else if (error instanceof Error) {
    message = error?.message
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : []
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env !== 'production' ? error?.stack : undefined,
  })
  next()
}

export default golbalErrorHandler
