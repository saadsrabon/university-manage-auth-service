// create a route moduler pattern

import express from 'express'
// import { UserController } from './user.controller'

import ValidationRequest from '../../middlewares/validateRequest'
import { AcademicSemisterValidation } from './academicsemister.validation'
import createSemisterController from './academicController'

const router = express.Router()
router.post(
  '/create-semister',
  ValidationRequest(AcademicSemisterValidation.AcademicSemisterZodSchema),
  createSemisterController
)

export const SemisterRouter = router
