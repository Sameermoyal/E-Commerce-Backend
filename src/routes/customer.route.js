import express from 'express'
const router=express.Router()
import { protectRoute } from '../middelware/auth.middeleware.js'
import { product,addToCart ,getCart,removeCartItem,changeQuantity} from '../controllers/customerProduct.controller.js'



router.get('/getProduct',protectRoute,product)
router.get('/getCartItem',protectRoute,getCart)

router.post('/addToCart',protectRoute,addToCart)

router.post('/itemQuantity',protectRoute,changeQuantity)
router.delete('/removeCart/:itemId',protectRoute,removeCartItem)





export default router