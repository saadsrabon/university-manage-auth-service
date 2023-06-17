import { Model } from 'mongoose'
export type IAcademicSemesterMonths =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December'

export type IAcademicSemesterTitles = 'Autumn' | 'Summer' | 'Fall'

export type IAcademicSemesterCodes = '01' | '02' | '03'

export type academicSemister = {
  title: IAcademicSemesterTitles
  year: number
  code: IAcademicSemesterCodes
  startMonth: IAcademicSemesterMonths
  endMonth: IAcademicSemesterMonths
}

export type AcademicSemisterModel = Model<academicSemister>
