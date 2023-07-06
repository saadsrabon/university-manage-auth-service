import { SortOrder } from 'mongoose'
import {
  IAcademicDepartmentFilters,
  Idepartments,
} from './departments.interface'
import { IpaginationOption } from '../../../interfaces/paginationOptions'
import { IGenericPaginationResponse } from '../../../interfaces/comon'
import { paginationHelpers } from '../../helpers/paginationHelper'
import { academicDepartmentSearchableFields } from './departments.constants'
import { AcademicDepartment } from './department.model'

const getAllDepartments = async (
  filters: IAcademicDepartmentFilters,
  paginationOptions: IpaginationOption
): Promise<IGenericPaginationResponse<Idepartments[]>> => {
  const { limit, page, skipValue, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions)

  const { searchTerm, ...filtersData } = filters

  const andConditions = []

  if (searchTerm) {
    andConditions.push({
      $or: academicDepartmentSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $paginationOptions: 'i',
        },
      })),
    })
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    })
  }

  const sortConditions: { [key: string]: SortOrder } = {}

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {}

  const result = await AcademicDepartment.find(whereConditions)
    .populate('AcademicFaculty')
    .sort(sortConditions)
    .skip(skipValue)
    .limit(limit)

  const total = await AcademicDepartment.countDocuments()

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

const createDepartment = async (
  payload: Idepartments
): Promise<Idepartments | null> => {
  const result = (await AcademicDepartment.create(payload)).populate(
    'academicFaculty'
  )
  return result
}

const getSingleDepartment = async (
  id: string
): Promise<Idepartments | null> => {
  const result = await AcademicDepartment.findById(id).populate(
    'academicFaculty'
  )
  return result
}

const updateDepartment = async (
  id: string,
  payload: Partial<Idepartments>
): Promise<Idepartments | null> => {
  const result = await AcademicDepartment.findOneAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
    }
  ).populate('academicFaculty')
  return result
}

const deleteDepartment = async (id: string): Promise<Idepartments | null> => {
  const result = await AcademicDepartment.findByIdAndDelete(id)
  return result
}

export const AcademicDepartmentService = {
  getAllDepartments,
  getSingleDepartment,
  updateDepartment,
  deleteDepartment,
  createDepartment,
}
