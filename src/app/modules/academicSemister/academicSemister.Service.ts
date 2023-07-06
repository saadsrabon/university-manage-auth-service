//Create a service for Creating a new User

import { SortOrder } from 'mongoose'
import { IpaginationOption } from '../../../interfaces/paginationOptions'
import ApiError from '../../errors/ApiError'
import { paginationHelpers } from '../../helpers/paginationHelper'
import { academicSemesterTitleCodeMapper } from './academicSemister.constant'
import { IacademicSemister } from './academicSemister.interface'
import { AcademicSemister } from './academicSemister.model'
import { IGenericPaginationResponse } from '../../../interfaces/comon'

const createSemisterService = async (
  SemisterData: IacademicSemister
): Promise<IacademicSemister | null> => {
  // check korbo amader data te jeta asheb seitar code er sathe amader map er
  if (
    academicSemesterTitleCodeMapper[SemisterData.title] !== SemisterData.code
  ) {
    throw new ApiError(400, 'Bad Request')
  }
  const createdSemister = await AcademicSemister.create(SemisterData)

  return createdSemister
}

// acdeemic semister service for getting all semister

const getSemisterService = async (
  filters: { searchTerm?: string },
  paginationdata: IpaginationOption
): Promise<IGenericPaginationResponse<IacademicSemister[]>> => {
  // data theke amak main data gulo niye skip functionality korte hbe and findout korte hbe
  //shb data ante hbe model theke er por limit korte hbe,

  const { page, limit, skipValue, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationdata)
  const { searchTerm, ...filersData } = filters
  const academicSemisterSearchableFields = ['title', 'code', 'year']
  const andCondition = []
  // dynamicaly pushed searchable fields
  if (searchTerm) {
    andCondition.push({
      $or: academicSemisterSearchableFields.map(fields => ({
        [fields]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    })
  }

  if (Object.keys(filersData).length) {
    andCondition.push({
      $and: Object.entries(filersData).map(([key, value]) => ({
        [key]: value,
      })),
    })
  }

  // Dynamically filter add

  const sortConditions: { [key: string]: SortOrder } = {}
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder
  }

  // CREATING where condition to make find conditional base on query

  const whereCondition = andCondition.length ? { $and: andCondition } : {}

  const result = await AcademicSemister.find(whereCondition)
    .sort(sortConditions)
    .skip(skipValue)
    .limit(limit)
  const total = await AcademicSemister.countDocuments()

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
  //write a service for getting a single semister
}

const getSingleSemisterService = async (
  payload: string
): Promise<IacademicSemister | null> => {
  const result = AcademicSemister.findById(payload)
  return result
}

const updateSingleSemisterService = async (
  id: string,
  payload: Partial<IacademicSemister>
): Promise<IacademicSemister | null> => {
  const result = AcademicSemister.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  })

  return result
}
export const AcademicSemisterService = {
  createSemisterService,
  getSemisterService,
  getSingleSemisterService,
  updateSingleSemisterService,
}
