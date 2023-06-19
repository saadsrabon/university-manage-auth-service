import { Request, Response } from 'express' //
import { AcademicSemisterService } from './academicSemister.Service'
import catchAsync from '../../../shared/catchAsync'

const createSemisterController = catchAsync(
  async (req: Request, res: Response) => {
    const { ...academicSemesterData } = req.body
    const data = await AcademicSemisterService.createSemisterService(
      academicSemesterData
    )

    res.send(data)
  }
)

export default createSemisterController
