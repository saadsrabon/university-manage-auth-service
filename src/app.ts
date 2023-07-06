import express, { Application, Request, Response } from 'express'
import golbalErrorHandler from './app/middlewares/globalError'
import routes from './app/routes/routes'
// import ApiError from './app/errors/ApiError'
const app: Application = express()

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true }))

// for parsing application/x-www-form-urlencoded
app.use('/api', routes)

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

// handle route not found

app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'Route Not Found',
    errorMessage: [
      {
        path: req.originalUrl,
        message: 'Route Not Found',
      },
    ],
  })
})

app.use(golbalErrorHandler)

export default app
