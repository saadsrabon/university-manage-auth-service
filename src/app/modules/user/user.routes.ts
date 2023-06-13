// create a route moduler pattern

import express from 'express'
import { getUser } from './user.controller'
const router = express.Router()
router.get('/create-user', getUser)

export default router
