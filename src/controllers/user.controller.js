import userModel from "../models/user.model.js";
import bcryptjs from "bcryptjs";

export const userSignup=async(req,res)=>{
    try {
        const{name,email,password,role}= req.body;
        
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
        
    }
}