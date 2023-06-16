import express, { Application, Request, Response } from 'express'
import golbalErrorHandler from './app/middlewares/globalError'
import { UserRouter } from './app/modules/user/user.routes'
// import ApiError from './app/errors/ApiError'
const app: Application = express()

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true }))

// for parsing application/x-www-form-urlencoded
app.use('/api/v2', UserRouter)

// we use  it before here because we want to use it in all routes
//  class ApiError  extends Error {
//     statusCode: number;
//   constructor(statusCode:number  , message: string, stack="") {
//     super(message);
//     this.statusCode = statusCode;
//     if(stack) {
//         this.stack = stack
//     }else{
//         Error.captureStackTrace(this, this.constructor);
//     }
//   }
// }

// app.get('/api/check' , (req:Request ,res:Response ,next:NextFunction) => {
//     // throw new ApiError(400 , 'Bad Request')
//     next("Oreh Baba errror");
// }  )

// app.use((err:Error , req:Request ,res:Response ,next:NextFunction) => {
//   console.log(err);
//   res.send(err)
//   res.status(500).json({error:'Something broke!'})

// })

// using Middle Wares to handle errors globally
// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
app.get('/', async (req: Request, res: Response) => {
  // throw new ApiError(400 , 'Bad Request')
  Promise.reject(new Error('Oreh Baba errror'))
  // throw new Error('Oreh Baba errror');
})

app.use(golbalErrorHandler)

export default app
