import express from 'express'
const router=express.Router()
import { protectRoute } from '../middelware/auth.middeleware.js'
import { product } from '../controllers/customerProduct.controller.js'



router.get('/getProduct',protectRoute,product)





export default router