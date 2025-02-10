import express from 'express'
const router =express.Router()
import { protectRoute } from '../middelware/auth.middeleware.js'
import {protectedAdminMiddelware} from '../middelware/authAdmin.middleware.js'
import { getData,getSeller,blockUser} from '../controllers/admin.controller.js'

router.get('/getData',protectRoute,protectedAdminMiddelware,getData)
router.get('/getSpecificSeller/:sellerId',protectRoute,protectedAdminMiddelware,getSeller)


router.post('/blockUser',protectRoute,protectedAdminMiddelware,blockUser)

export default router