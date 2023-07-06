import { Schema, model } from 'mongoose'
import { AcademicDepartmentsModel, Idepartments } from './departments.interface'

const AcademicDepartmentSchema = new Schema<
  Idepartments,
  AcademicDepartmentsModel
>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicFaculty',
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
)

export const AcademicDepartment = model<Idepartments, AcademicDepartmentsModel>(
  'AcademicDepartment',
  AcademicDepartmentSchema
)
