import userModel from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { generateToken } from "../lib/utils.js";


export const userSignup=async(req,res)=>{
    try {
        const{name,email,password,role}= req.body;
        console.log("signup api call")
        if(!name || !email || !password){
            return res.status(400).json({message:"All fields required"})
        }
        
        const user=await userModel.findOne({email})
        if(user){
            return res.status(400).json({message:"Email already registerd"})
        } 


        const salt=await bcryptjs.genSalt(10);
        const hashPassword=await bcryptjs.hash(password,salt)
       
       const newUser =await userModel({
        name,email,role,
        password:hashPassword
       } )

      await newUser.save()

  
    console.log("newUSer",newUser)      
   return res.status(200).json({message:"new user successfully  registerd",newUser})

    } catch (error) {
       return res.status(500).json({message:"server error in signup"})
    }
}

export const userLogin=async(req,res,next)=>{
    try {
        const{email,password}= req.body;
        
        if( !email || !password){
            return res.status(400).json({message:"All fields required"})
        }
        
        const user=await userModel.findOne({email})
        const role=user.role;
        if(!user){
            return res.status(400).json({message:"Not to be found please sign up"})
        } 

        const hashPassword=user.password;       
  
        const match=await bcryptjs.compare(password,hashPassword)
       
         if(!match){
            return res.status(200).json({message:"Password Not Match Try Again !"})
         }
       
       const token= generateToken(user._id,res)
      
    
        console.log("login api call")
   return res.status(200).json({message:"User  Login Successfully",token,role})

    } catch (error) {
       return res.status(500).json({message:"server error in Login Route",error: error.message})
    }
}
export const getOne=async(req,res,next)=>{
    try {
      
     const user= req.user  ;
        
      console.log('getAll api call',user)
      
   return res.status(200).json({message:"get route work"})

    } catch (error) {
       return res.status(500).json({message:"server error in getOne Route",error: error.message})
    }
}


