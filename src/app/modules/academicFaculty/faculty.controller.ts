import catchAsync from '../../../shared/catchAsync'
import pick from '../../../shared/pick'
import { paginationFields } from '../../constants/pagination'
import { FacultyService } from './faculty.service'

const readAll = catchAsync(async (req, res) => {
  //using naming convention , here create is a self made code
  const filters = pick(req.query, ['searchTerm'])
  const paginationOptions = pick(req.query, paginationFields)

  const data = await FacultyService.readAll(filters, paginationOptions)
  res.status(200).json({
    success: true,
    message: 'Faculty reviced Successfully',
    data,
  })

  res.status(200).json({
    success: true,
    message: 'Faculties got Successfully',
    data,
  })
})
const read = catchAsync(async (req, res) => {
  const id = req.params.id
  //using naming convention , here create is a self made code
  const data = await FacultyService.read(id)

  res.status(200).json({
    success: true,
    message: 'Faculty got Successfully',
    data,
  })
})

// get faculty
const create = catchAsync(async (req, res) => {
  const update = req.body
  //using naming convention , here create is a self made code
  const data = await FacultyService.create(update)

  res.status(200).json({
    success: true,
    message: 'Faculty Created Successfully',
    data,
  })
})
//Update FDaculty
const deletes = catchAsync(async (req, res) => {
  const id = req.params.id

  const data = await FacultyService.deletes(id)

  res.status(200).json({
    success: true,
    message: 'Semister updated Successfully',
    data,
  })
})
const update = catchAsync(async (req, res) => {
  const id = req.params.id
  const havetoUpdate = req.body
  const data = await FacultyService.update(id, havetoUpdate)

  res.status(200).json({
    success: true,
    message: 'Semister updated Successfully',
    data,
  })
})

export const FacultyController = {
  create,
  read,
  update,
  deletes,
  readAll,
}
