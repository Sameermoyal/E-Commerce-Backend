import productModel from "../models/product.model.js"
import Cart from "../models/cart.model.js"
import Order from "../models/order.model.js"

export const product=async(req,res)=>{
    try {
        const user=req.user
        console.log(" api call /getProduct")
         
        const productList=await productModel.find()

        
       
       return res.status(200).json({message:"product list send successfully",productList})
    } catch (error) {
        console.log("Error to send product List",error.message)
       return res.status(500).json({message:"Error to get ProductList",error:error.message})
    }
}
export const addToCart=async(req,res)=>{
    try {
        const user=req.user
        console.log(" api call /addToCart")
         
        const {productId,quantity}=req.body;
    //     const preCartProduct = await Cart.findOne({ 
    //         customerId: user.userId, 
    //         "items.productId": productId
    //       });
          
          
    //    console.log("preCartProduct",preCartProduct)

    //    if(preCartProduct.length>0){
    //     return res.status(400).json({message:"product added  in already to cart "})
    //    }
       const cartProduct=await Cart({customerId :user.userId, items:[{productId,quantity}] })
       cartProduct.save()
         console.log("user",user.userId)
      console.log("cart product",cartProduct)
        
      
       
       return res.status(200).json({message:"product add in cart successfully"})
    } catch (error) {
        console.log("Error to add item in cart",error.message)
       return res.status(500).json({message:"Error to add item in cart",error:error.message})
    }
}
export const createOrder=async(req,res)=>{
    try {
      
            const { productId, quantity, address, paymentMode } = req.body;
        
            if (!productId || !quantity || !address || !paymentMode) {
              return res.status(400).json({ message: "All fields are required." });
            }
        
            const newOrder = new Order({
              userId: req.user.userId, // Extracted from authMiddleware
              productId,
              quantity,
              address,
              paymentMode,
            });
        
            await newOrder.save();
        
            res.status(201).json({ message: "Order placed successfully!", order: newOrder });
      
    } catch (error) {
        console.log("Error to  create order ",error.message)
       return res.status(500).json({message:"Error to create order",error:error.message})
    }
}
export const getCart=async(req,res)=>{
    try {
        const user=req.user
        console.log(" api call /getCart")
           
        const cartList = await Cart.find({ customerId: user.userId }).populate("items.productId");

       if(cartList.length==0){
        return res.status(400).json({message:"No product added  in cart "})
       }
     console.log("cartList.items",cartList)
       return res.status(200).json({message:"product add in cart successfully",cartList})
    } catch (error) {
        console.log("Error to add item in cart",error.message)
       return res.status(500).json({message:"Error to add item in cart",error:error.message})
    }
}



export const removeCartItem=async(req,res)=>{
    try {
        const user=req.user
        console.log(" api call /removeCartItemt")
         const{itemId}=req.params
         console.log("itemId",itemId)
      const removeItem=await Cart.findOneAndDelete()

        
       
       return res.status(200).json({message:"product remove from cart"})
    } catch (error) {
        console.log("Error to send removeCartItem",error.message)
       return res.status(500).json({message:"Error to delete removeCartItem",error:error.message})
    }
}
