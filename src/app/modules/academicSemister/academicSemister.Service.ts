//Create a service for Creating a new User

import ApiError from '../../errors/ApiError'
import { academicSemesterTitleCodeMapper } from './academicSemister.constant'
import { academicSemister } from './academicSemister.interface'
import { AcademicSemister } from './academicSemister.model'

const createSemisterService = async (
  SemisterData: academicSemister
): Promise<academicSemister | null> => {
  // check korbo amader data te jeta asheb seitar code er sathe amader map er
  if (
    academicSemesterTitleCodeMapper[SemisterData.title] !== SemisterData.code
  ) {
    throw new ApiError(400, 'Bad Request')
  }
  const createdSemister = await AcademicSemister.create(SemisterData)

  return createdSemister
}

export const AcademicSemisterService = {
  createSemisterService,
}
