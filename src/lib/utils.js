import jwt from "jsonwebtoken"

export const generateToken=(userId,res)=>{
    const token=jwt.sign({userId},process.env.SECRET_KEY,{expiresIn:'7d'}) 

    return token
}
