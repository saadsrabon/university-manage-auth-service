import { SortOrder } from 'mongoose'
import { paginationHelpers } from '../../helpers/paginationHelper'
import { Ifaculty } from './faculty.interface'
import facultyModel from './faculty.model'
import { IpaginationOption } from '../../../interfaces/paginationOptions'
import { IGenericPaginationResponse } from '../../../interfaces/comon'

const create = async (payload: Ifaculty): Promise<Ifaculty> => {
  const createdFaculty = await facultyModel.create(payload)
  return createdFaculty
}
const readAll = async (
  filters: { searchTerm?: string },
  paginationdata: IpaginationOption
): Promise<IGenericPaginationResponse<Ifaculty[]>> => {
  // data theke amak main data gulo niye skip functionality korte hbe and findout korte hbe
  //shb data ante hbe model theke er por limit korte hbe,

  const { page, limit, skipValue, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationdata)
  const { searchTerm, ...filersData } = filters
  const academicSemisterSearchableFields = ['tittle']
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

  const result = await facultyModel
    .find(whereCondition)
    .sort(sortConditions)
    .skip(skipValue)
    .limit(limit)
  const total = await facultyModel.countDocuments()

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
// get service
const read = async (payload: string): Promise<Ifaculty | null> => {
  const faculties = await facultyModel.findById(payload)
  return faculties
}
//update service
const update = async (
  id: string,
  payload: Ifaculty
): Promise<Ifaculty | null> => {
  const updatedFacultiees = await facultyModel.findOneAndUpdate(
    { _id: id },
    payload,
    { new: true }
  )
  return updatedFacultiees
}

const deletes = async (id: string): Promise<Ifaculty | null> => {
  const deletedFaculty = await facultyModel.findByIdAndDelete(id)
  return deletedFaculty
}
export const FacultyService = {
  create,
  read,
  update,
  deletes,
  readAll,
}
