import express from 'express'
import { FacultyController } from './faculty.controller'

const router = express.Router()

// create faculty
router.post('/create-faculty', FacultyController.create)
router.get('/', FacultyController.readAll)
router.get('/:id', FacultyController.read)
router.patch('/update/:id', FacultyController.update)
router.delete('/delete/:id', FacultyController.deletes)

export const FacultyRouter = router
