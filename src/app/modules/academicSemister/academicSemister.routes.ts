// create a route moduler pattern

import express from 'express'
// import { UserController } from './user.controller'

import ValidationRequest from '../../middlewares/validateRequest'
import { AcademicSemisterValidation } from './academicsemister.validation'
import createSemisterController, {
  getSemisterController,
  getSingleSemister,
  updateSemister,
} from './academicController'

const router = express.Router()
router.post(
  '/create-semister',
  ValidationRequest(AcademicSemisterValidation.AcademicSemisterZodSchema),
  createSemisterController
)
// update routes
router.patch('/:id', updateSemister)
// get single semister
router.get('/:id', getSingleSemister)
// get all semister with filter and serach dynamically
router.get('/', getSemisterController)

export const SemisterRouter = router
