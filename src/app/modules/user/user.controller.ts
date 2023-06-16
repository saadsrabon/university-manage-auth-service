import { userService } from './user.service'
import { RequestHandler } from 'express' //

const getUser: RequestHandler = async (req, res, next) => {
  try {
    // const createUserZodSchema = z.object({
    //   body: z.object({
    //     role:z.string({
    //       required_error:'Role is required'
    //     })
    //   }),
    // })
    // await createUserZodSchema.parseAsync(req)
    const userData = req.body
    const data = await userService.createUser(userData)

    res.send(data)
  } catch (err) {
    next(err)
  }
}

export const UserController = {
  getUser,
}
