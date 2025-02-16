import express from 'express'
const router=express.Router()
import { protectRoute } from '../middelware/auth.middeleware.js'
import { addProduct ,getAllProduct,getOneProduct,updateProduct,deleteProduct,changeOrderStatus} from '../controllers/seller.controller.js'
import {protectedSellerRoute} from '../middelware/authSeller.middleware.js'



router.post('/addProduct',protectRoute,protectedSellerRoute,addProduct)

router.get('/getSellerProduct',protectRoute,protectedSellerRoute,getAllProduct)
router.get('/getOneProduct/:userId',protectRoute,protectedSellerRoute,getOneProduct)



router.patch('/updateOneProduct',protectRoute,protectedSellerRoute,updateProduct)


router.patch('/updateOrderStatus/:orderId',protectRoute,protectedSellerRoute,changeOrderStatus)

router.delete('/deleteOneProduct/:productId',protectRoute,protectedSellerRoute,deleteProduct)





export default router