// service will always hold the business logics only

import { UsersModel } from './user.model'
import { Iuser } from './user.interface'

import userUtils from './user.utils'

// Create a service for Creating a new User

const createUser = async (user: Iuser): Promise<Iuser | null> => {
  //we will create a new user here
  //with incremental id
  // defult password
  if (!user.id) {
    user.id = (await userUtils.generatedId()) as string
  }
  const createdUser = UsersModel.create(user)
  if (!createdUser) throw new Error('User not created')
  return createdUser
}

export const userService = {
  createUser,
}
