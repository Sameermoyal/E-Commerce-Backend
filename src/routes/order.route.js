import express from "express"
const router=express.Router()
import { protectRoute } from '../middelware/auth.middeleware.js'
import {createOrder,orderItem} from "../controllers/order.controller.js"

router.post('/createOrder',protectRoute,createOrder)

router.get('/getOrderItem',protectRoute,orderItem)



export default router