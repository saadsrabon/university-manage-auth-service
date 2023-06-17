// create a route moduler pattern

import express from 'express'
// import { UserController } from './user.controller'

import ValidationRequest from '../../middlewares/validateRequest'
import { AcademicSemisterValidation } from './academicsemister.validation'

const router = express.Router()
router.get(
  '/create-user',
  ValidationRequest(AcademicSemisterValidation.AcademicSemisterZodSchema)
  //   UserController.getUser
)

export const UserRouter = router
