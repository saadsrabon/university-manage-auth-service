// create a route moduler pattern

import express from 'express'
import { UserController } from './user.controller'
import { UserValidation } from '../../middlewares/validateRequest'
import { UserValidationSchema } from './user.validation'

const router = express.Router()
router.get(
  '/create-user',
  UserValidation.ValidationRequest(UserValidationSchema.createUserZodSchema),
  UserController.getUser
)

export const UserRouter = router
