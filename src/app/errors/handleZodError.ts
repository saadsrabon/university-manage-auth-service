import { ZodError, ZodIssue } from 'zod'
import {
  IGenericErrorMessage,
  IGenericErrorResponse,
} from '../modules/user/user.interface'

const handleZodError = (error: ZodError): IGenericErrorResponse => {
  console.log(error)
  const errors: IGenericErrorMessage[] = error.issues.map((issue: ZodIssue) => {
    return {
      // taking second index as it is the last one
      path: issue?.path[issue.path.length - 1],
      message: issue?.message,
    }
  })
  // zod handles  returning this
  return {
    statusCode: 400,
    message: 'Validation Error',
    errorMessages: errors,
  }
}

// }

export default handleZodError
