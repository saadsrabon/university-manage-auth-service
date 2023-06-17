import { Schema, model } from 'mongoose'
import {
  AcademicSemisterModel,
  academicSemister,
} from './academicSemister.interface'
import {
  academicSemesterCodes,
  academicSemesterTitles,
  acdemicSemesterMonths,
} from './academicSemister.constant'

const AcademicSemiterschema = new Schema<academicSemister>(
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

export const AcademicSemister = model<academicSemister, AcademicSemisterModel>(
  'AcademicSemister',
  AcademicSemiterschema
)
