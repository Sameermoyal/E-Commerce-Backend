import productModel from "../models/product.model.js"
import cloudinary from "../lib/cloudinary.js";

export const addProduct = async (req, res) => {
    try {
        console.log("API Call: /addProduct");
        
      
        if (!req.files || !req.files.image) {
            return res.status(400).json({ message: "Image is not uploaded" });
        }
     console.log("req.files",req.files)
     
        const file = req.files.image;
        console.log("Received File:", file);

   
        const { title, rate, desc, category,quantity ,brand} = req.body;
       
         console.log("title",title, "rate",rate, "desc",desc,"category", category,"quantity",quantity ,"brand",brand)

         
        if (!title || !rate || !desc || !category || !quantity) {
            return res.status(400).json({ message: "All fields are required!" });
        }

        // Upload to Cloudinary
        const uploadResponse = await cloudinary.uploader.upload(file.tempFilePath, {
            folder: "products",  // Optional: Store images in a Cloudinary folder
            use_filename: true,
            unique_filename: false
        });

        console.log("Cloudinary Upload Response:", uploadResponse);

        // Save product in DB (Assuming productModel has a `imageUrl` field)
        const newProduct = await productModel.create({
            sellerId:req.user.userId,
            title,
            rate,
            desc,quantity,
            category,brand,
            imageUrl: uploadResponse.secure_url,
           
        });

        return res.status(201).json({ message: "Product added successfully!", product: newProduct });

    } catch (error) {
        console.error("Error in addProduct:", error);
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const getAllProduct = async (req, res) => {
    try {
        console.log("API Call: /getAllProduct");
        
      const {userId}=req.user;
      
      const productList=await productModel.find({sellerId:userId})
      
      

        return res.status(201).json({ message: "Product get successfully!", userId:userId ,productList});

    } catch (error) {
        console.error("Error in getAllProduct:", error);
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};
export const getOneProduct = async (req, res) => {
    try {
        const {userId}=req.params;
        console.log("API Call: /getOneProduct/:userId",userId);
      const productList=await productModel.findOne({_id:userId})
     console.log("userId",productList)
   return res.status(201).json({ message: "Product get One successfully!", userId:userId ,productList});

    } catch (error) {
        console.error("Error in getAllProduct:", error);
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};


export const updateProduct = async (req, res) => {
    try {
        const { title, rate, desc, category,quantity ,brand,_id} = req.body;
       
        console.log("title",title, "rate",rate, "desc",desc,"category", category,"quantity",quantity ,"brand",brand,_id)
        console.log("API Call: /updateProduct");

    
     if (!req.files || !req.files.image) {
        const productList=await productModel.findByIdAndUpdate(_id,{title,rate,desc,quantity,category,brand})
        
        return res.status(201).json({ message: "Product get One successfully!" ,productList})
    }

    const file = req.files.image;
    const uploadResponse = await cloudinary.uploader.upload(file.tempFilePath, {
        folder: "products",  // Optional: Store images in a Cloudinary folder
        use_filename: true,
        unique_filename: false
    });

    console.log("Cloudinary Upload Response:", uploadResponse);

   
    const productList = await productModel.findByIdAndUpdate(_id,{
     
        title,
        rate,
        desc,quantity,
        category,brand,
        imageUrl: uploadResponse.secure_url,
       
    },{new:true});  
    
   return res.status(201).json({ message: "Product get One successfully!",productList});

    } catch (error) {
        console.error("Error in getOneProduct:", error);
        return res.status(500).json({ message: "Server error in get OneProduct", error: error.message });
    }
};
export const deleteProduct = async (req, res) => {
    try {
         console.log("API Call: /deleteProduct in side seller")
        
        const {productId} = req.params;
       
        console.log("API Call: /deleteProduct in side seller",productId);
   
        const deletedProduct=await productModel.findByIdAndDelete(productId)
    
       
   return res.status(201).json({ message: "Product get One successfully!"});

    } catch (error) {
        console.error("Error in getOneProduct:", error);
        return res.status(500).json({ message: "Server error in get OneProduct", error: error.message });
    }
};
