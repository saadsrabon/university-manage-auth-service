import { NextFunction, Request, Response } from 'express'

const golbalErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(400).json({ error: err })
  next()
}

export default golbalErrorHandler
