import { UsersModel } from './user.model'

//
const findLastId = async () => {
  const lastId = await UsersModel.findOne({}, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean()
  console.log(lastId)
  return lastId?.id
}

const generatedId = async () => {
  const id = (await findLastId()) || (0).toString().padStart(5, '0')
  const convartedId = (parseInt(id) + 1).toString().padStart(5, '0')
  return convartedId
}

export default { generatedId }
