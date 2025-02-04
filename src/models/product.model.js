import mongoose from "mongoose";

const productSchema=new mongoose.Schema({
    sellerId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    required: true
    } ,

    title:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    rate:{
        type:String,
        required:true
    }
})

 const productModel=mongoose.model('Product',productSchema)

 export default productModel;