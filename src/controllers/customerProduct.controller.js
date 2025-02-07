import productModel from "../models/product.model.js"

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