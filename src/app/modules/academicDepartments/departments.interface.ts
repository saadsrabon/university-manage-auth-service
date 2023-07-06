import { Model, Types } from 'mongoose'
import { Ifaculty } from '../academicFaculty/faculty.interface'

export type Idepartments = {
  title: string
  academicFaculty: Types.ObjectId | Ifaculty
}

export type AcademicDepartmentsModel = Model<
  Idepartments,
  Record<string, unknown>
>

export type IAcademicDepartmentFilters = {
  searchTerm?: string
  academicFaculty?: Types.ObjectId
}
