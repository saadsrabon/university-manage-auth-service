import service from './user.service'
import { NextFunction, Request, Response } from 'express' //

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userData = req.body
    const data = await service.createUser(userData)

    res.send(data)
  } catch (err) {
    next(err)
  }
}
