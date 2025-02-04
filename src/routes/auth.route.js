import express from 'express'
import { protectRoute } from '../middelware/auth.middeleware.js'
const router=express.Router()
import { userSignup,userLogin ,getOne} from '../controllers/user.controller.js'


router.post('/signup',userSignup)
router.post('/login',userLogin)
router.get('/getAll',getOne)




export default router