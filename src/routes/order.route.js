import express from "express"
const router=express.Router()
import { protectRoute } from '../middelware/auth.middeleware.js'
import {createOrder,orderItem,TrackCustomerOrder} from "../controllers/order.controller.js"
import { protectedSellerRoute } from "../middelware/authSeller.middleware.js"

router.post('/createOrder',protectRoute,createOrder)

router.get('/getOrderItem',protectRoute,orderItem)

router.get('/trackCustomerOrder',protectRoute,protectedSellerRoute,TrackCustomerOrder)



export default router