import express from 'express'
const router =express.Router()
import { protectRoute } from '../middelware/auth.middeleware.js'
import {protectedAdminMiddelware} from '../middelware/authAdmin.middleware.js'
import { getData,getSeller} from '../controllers/admin.controller.js'

router.get('/getData',protectRoute,protectedAdminMiddelware,getData)
router.get('/getSpecificSeller/:sellerId',protectRoute,protectedAdminMiddelware,getSeller)

export default router