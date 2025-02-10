import userModel from "../models/user.model.js";
import productModel from "../models/product.model.js";

export const getData = async (req, res) => {
    try {
        console.log("API Call: /getData in admin controller");
        
      const {userId}=req.user;
      
      const sellerList=await userModel.find({role:"seller"})
      const customerList=await userModel.find({role:"customer"}).select("-password")
      
      const allUserData=[...sellerList,...customerList]

        return res.status(201).json({ message: "Product get successfully!", allUserData});

    } catch (error) {
        console.error("Error in get Data in admin controller:", error);
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};
export const getSeller = async (req, res) => {
    try {
        console.log("API Call: /getSpecificSeller in admin controller");
        
      const {sellerId}=req.params;
      if(!sellerId){
        return res.status(400).json({message : "share seller Id"})
       }  

        console.log("selelrID", sellerId)

    

      const seller=await userModel.findById({_id:sellerId})
       if(!seller){
        return res.status(400).json({message : "seller not found"})
       }  

     const sellerProducts=await productModel.find({sellerId:seller._id})  
    const productlength=sellerProducts.length;

    console.log(productlength)
        return res.status(201).json({ message: "Product get successfully!", sellerProducts,productlength});

    } catch (error) {
        console.error("Error in get Seller data in admin controller:", error);
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};
export const blockUser = async (req, res) => {
    try {
        console.log("API Call : /blockUser in admin controller");

        const { userId }=req.body;
     
      
      if(!userId){
        return res.status(400).json({message : "share user Id"})
       }  

        
      const user=await userModel.findById(userId)
      const userdata=await userModel.findByIdAndUpdate(userId,{userStatus:!user.userStatus},{new:true}).select("userStatus")
 
   const{userStatus} =userdata
   console.log("userStatus",userStatus)

        return res.status(201).json({ message: "Product get successfully!" ,userStatus});

    } catch (error) {
        console.error("Error in get Seller data in admin controller:", error);
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};