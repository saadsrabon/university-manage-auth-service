import { NextFunction, Request, Response } from 'express' //
import { AcademicSemisterService } from './academicSemister.Service'
import catchAsync from '../../../shared/catchAsync'
import pick from '../../../shared/pick'
import { paginationFields } from '../../constants/pagination'

// create a new semister controller
const createSemisterController = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...academicSemesterData } = req.body
    const data = await AcademicSemisterService.createSemisterService(
      academicSemesterData
    )

    res.status(200).json({
      success: true,
      message: 'Semister Created Successfully',
      data,
    })

    next()
  }
)
// controller for getting semister also dynamic search and filiters
export const getSemisterController = catchAsync(
  async (req: Request, res: Response) => {
    //   const paginationdata ={
    //     page: Number(req.query.page),
    //     limit: Number(req.query.limit),
    //     sortBy: req.query.sortBy,
    //     sortOrder: req.query.sortOrder,

    //  }
    const filters = pick(req.query, ['searchTerm'])
    const paginationOptions = pick(req.query, paginationFields)

    const data = await AcademicSemisterService.getSemisterService(
      filters,
      paginationOptions
    )
    res.status(200).json({
      success: true,
      message: 'Semister retrived Successfully',
      data,
    })
    // next()
  }
)

// Get single semister controller
export const getSingleSemister = catchAsync(async (req, res) => {
  const id = req.params.id
  const data = await AcademicSemisterService.getSingleSemisterService(id)

  res.status(200).json({
    success: true,
    message: 'Semister retrived Successfully',
    data,
  })
})
export const updateSemister = catchAsync(async (req, res) => {
  const id = req.params.id
  const havetoUpdate = req.body
  const data = await AcademicSemisterService.updateSingleSemisterService(
    id,
    havetoUpdate
  )

  res.status(200).json({
    success: true,
    message: 'Semister updated Successfully',
    data,
  })
})

export default createSemisterController
