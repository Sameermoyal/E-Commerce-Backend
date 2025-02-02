import express from "express"
import dotenv from "dotenv";
import cors from 'cors';
dotenv.config()
import { connectDB } from "./lib/db.js"

import userAuthRoute from "./routes/auth.route.js"


const app=express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/api/auth',userAuthRoute)

app.listen(process.env.PORT,()=>console.log(`server running this port`,process.env.PORT))
connectDB()


