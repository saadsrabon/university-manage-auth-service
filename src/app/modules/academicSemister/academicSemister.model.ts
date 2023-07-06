import { Schema, model } from 'mongoose'
import {
  AcademicSemisterModel,
  IacademicSemister,
} from './academicSemister.interface'
import {
  academicSemesterCodes,
  academicSemesterTitles,
  acdemicSemesterMonths,
} from './academicSemister.constant'
import ApiError from '../../errors/ApiError'

const AcademicSemiterschema = new Schema<IacademicSemister>(
  {
    title: {
      type: String,
      required: true,
      enum: academicSemesterTitles,
    },
    year: {
      type: Number,
      required: true,
    },
    code: {
      type: String,
      required: true,
      enum: academicSemesterCodes,
    },
    startMonth: {
      type: String,
      required: true,
      enum: acdemicSemesterMonths,
    },
    endMonth: {
      type: String,
      required: true,
      enum: acdemicSemesterMonths,
    },
  },
  {
    timestamps: true,
  }
)

AcademicSemiterschema.pre('save', async function (next) {
  // do stuff
  const isExist = await AcademicSemister.findOne({
    title: this.title,
    year: this.year,
  })
  if (isExist) {
    throw new ApiError(400, 'Same year and semister found')
  }
  next()
})
export const AcademicSemister = model<IacademicSemister, AcademicSemisterModel>(
  'AcademicSemister',
  AcademicSemiterschema
)
