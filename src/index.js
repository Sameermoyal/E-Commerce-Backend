import express from "express"
import dotenv from "dotenv";
import cors from 'cors';
dotenv.config()
import { connectDB } from "./lib/db.js"
import cookieParser from 'cookie-parser';
import userAuthRoute from "./routes/auth.route.js"
import customerRoute from "./routes/customer.route.js"
import sellerRoute from "./routes/seller.route.js"
import adminRoute from "./routes/admin.route.js"
import orderRoute from "./routes/order.route.js"
import fileUpload from "express-fileupload";


const app=express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(fileUpload({ useTempFiles: true, tempFileDir: "/tmp/" }));
app.use(cookieParser())

const PORT = process.env.PORT || 4000; 

app.use('/api/auth',userAuthRoute)
app.use('/api/customerProducts',customerRoute)
app.use('/api/seller',sellerRoute)
app.use('/api/admin',adminRoute)
app.use('/api/order',orderRoute)

app.listen(PORT, "0.0.0.0",()=>console.log(`server running this port`,process.env.PORT))
connectDB()


