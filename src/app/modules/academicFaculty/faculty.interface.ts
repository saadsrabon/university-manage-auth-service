import { Model } from 'mongoose'

export type Ifaculty = {
  tittle: string
}

export type AcademicFacultyModel = Model<Ifaculty, Record<string, unknown>>
