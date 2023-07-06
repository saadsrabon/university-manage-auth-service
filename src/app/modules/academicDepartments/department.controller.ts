import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import pick from '../../../shared/pick'
import { paginationFields } from '../../constants/pagination'
import { academicDepartmentFilterableFields } from './departments.constants'
import { AcademicDepartmentService } from './department.service'

const createDepartment = catchAsync(async (req: Request, res: Response) => {
  const departmentData = req.body
  const createdDepartment = await AcademicDepartmentService.createDepartment(
    departmentData
  )
  return res.status(200).json({
    success: true,
    message: 'Department Created Successfully',
    data: createdDepartment,
  })
})

// getAllDepartments
const getAllDepartments = catchAsync(async (req, res) => {
  //using naming convention , here create is a self made code
  const filters = pick(req.query, academicDepartmentFilterableFields)
  const paginationOptions = pick(req.query, paginationFields)

  const data = await AcademicDepartmentService.getAllDepartments(
    filters,
    paginationOptions
  )

  res.status(200).json({
    success: true,
    message: 'All Department Fetched Successfully',
    data,
  })
})

const getSingleDepartment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const data = await AcademicDepartmentService.getSingleDepartment(id)

  res.status(200).json({
    success: true,
    message: 'Faculties got Successfully',
    data,
  })
})

const updateDepartment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const data = await AcademicDepartmentService.updateDepartment(id, req.body)

  res.status(200).json({
    success: true,
    message: 'Faculties got Successfully',
    data,
  })
})

const deleteDepartment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const data = await AcademicDepartmentService.deleteDepartment(id)

  res.status(200).json({
    success: true,
    message: 'Faculties got Successfully',
    data,
  })
})

// deleteDepartment
// updateDepartment
// getSingleDepartment

export const AcademicDepartmentController = {
  createDepartment,
  getAllDepartments,
  getSingleDepartment,
  updateDepartment,
  deleteDepartment,
}
