// create a route moduler pattern

import express from 'express'
import { UserRouter } from '../modules/user/user.routes'
import { SemisterRouter } from '../modules/academicSemister/academicSemister.routes'
// import { UserController } from './user.controller'

const routes = express.Router()

const moduleRoutes = [
  {
    path: '/v2',
    route: UserRouter,
  },
  {
    path: '/v1/semister',
    route: SemisterRouter,
  },
]

moduleRoutes.forEach(router => routes.use(router.path, router.route))

export default routes
