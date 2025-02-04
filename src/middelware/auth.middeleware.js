import jwt from 'jsonwebtoken'
import userModel from '../models/user.model.js'

export const protectRoute=async(req,res,next)=>{
    try{
        const splittoken=req.headers.authorization?.split(" ")[1];
    if(!splittoken){
        return  res.status(400).json({message:"token invalid"})
    }
    const decode =jwt.verify(splittoken,process.env.SECRET_KEY)
    if(!decode){
        return  res.status(400).json({message:"token not verify"})
    }
    req.user=decode
  
    next();
    // res.status(200).json({message:"token verify"})
     
    }catch(error){
        res.status(500).json({message:"error to token verify",error:error.message})
    }
}
