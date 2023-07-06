// create a route moduler pattern

import express from 'express'
import { UserRouter } from '../modules/user/user.routes'
import { SemisterRouter } from '../modules/academicSemister/academicSemister.routes'
import { FacultyRouter } from '../modules/academicFaculty/faculty.router'
import { academicDepartmentRoutes } from '../modules/academicDepartments/department.router'
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
  {
    path: '/v1/faculty',
    route: FacultyRouter,
  },
  {
    path: '/v1/department',
    route: academicDepartmentRoutes,
  },
]

moduleRoutes.forEach(router => routes.use(router.path, router.route))

export default routes
