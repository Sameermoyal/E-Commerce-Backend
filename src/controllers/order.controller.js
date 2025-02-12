import productModel from "../models/product.model.js"
import userModel from "../models/user.model.js"
import Cart from "../models/cart.model.js"
import Order from "../models/order.model.js"

export const createOrder=async(req,res)=>{
    try {const user=req.user
              
            const { productId, quantity, address, paymentMode ,itemId,phone} = req.body;
        
            if (!productId || !quantity || !address || !paymentMode || !phone) {
              return res.status(400).json({ message: "All fields are required." });
            }
        

            const cart = await Cart.findOne({ customerId: user.userId });
         
            if (cart) {
                const itemToRemove = cart.items.find((item) => item._id.toString() === itemId);
                if (!itemToRemove) {
                    return res.status(404).json({ message: "Item not found in cart" });
                }
        
                const itemTotal = itemToRemove.total; // Get item's total before removing
                
                // Remove item & update totalAmount
                const updatedCart = await Cart.findOneAndUpdate(
                    { customerId: user.userId },
                    {
                        $pull: { items: { _id: itemId } },
                        $inc: { totalAmount: -itemTotal } // Reduce totalAmount
                    },
                    { new: true }
                );               


            }
      

    
       const product = await productModel.findById(productId)
   const preQunt=product.quantity;
   const updateQuntity=preQunt-quantity;
       const updateProductStock=await productModel.findByIdAndUpdate(productId,{quantity:updateQuntity})

    //    const sellerId=product.sellerId

    //    const seller=await userModel.findById(sellerId)
       

            const newOrder = new Order({
              customerId: req.user.userId, // Extracted from authMiddleware
              productId,
              quantity,
              address,
              paymentMode,
              phone,
            });
        
            await newOrder.save();
          


            
        
            res.status(201).json({ message: "Order placed successfully!", order: newOrder });
      
    } catch (error) {
        console.log("Error to  create order ",error.message)
       return res.status(500).json({message:"Error to create order",error:error.message})
    }
}
export const orderItem=async(req,res)=>{
    try {const user=req.user
             
        

     console.log("/track order api call")   
          
    const orderDetails=await Order.find({customerId:user.userId}).populate("productId")        

          
         
   console.log("orderDetails",orderDetails)         
 

    res.status(201).json({ message: "previcious Order get successfully",orderDetails });
      
    } catch (error) {
        console.log("Error to  pervious Order get successfully ",error.message)
       return res.status(500).json({message:"Error to previcious Order get successfully",error:error.message})
    }
}