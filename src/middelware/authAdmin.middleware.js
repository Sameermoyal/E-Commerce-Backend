import userModel from "../models/user.model.js";


export const protectedAdminMiddelware=async(req,res,next)=>{
    try{
       const { userId}=req.user;
      const user= await userModel.findById(userId).select('-password')
     
      if(!user){
        return res.status(400).json({message:"your identity not found please signup"})
      }
      console.log(user) 
      if(user.role !='admin'){
       
        return res.status(400).json({message:"you not permission to add product"})
      }
      
         
    next();
    // res.status(200).json({message:"token verify"})
     
    }catch(error){
        res.status(500).json({message:"error to authorized to seller",error:error.message})
    }
}




