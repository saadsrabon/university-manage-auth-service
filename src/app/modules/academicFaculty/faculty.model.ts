import { Schema, model } from 'mongoose'
import { Ifaculty, AcademicFacultyModel } from './faculty.interface'

const AcademicFacultySchema = new Schema<Ifaculty>({
  tittle: {
    type: String,
    required: true,
  },
})

const facultyModel = model<Ifaculty, AcademicFacultyModel>(
  'AcademicFaculty',
  AcademicFacultySchema
)
export default facultyModel
