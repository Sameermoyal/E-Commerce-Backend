import productModel from "../models/product.model.js"
import userModel from "../models/user.model.js"
import Cart from "../models/cart.model.js"
import Order from "../models/order.model.js"

export const product=async(req,res)=>{
    try {
        const user=req.user
        console.log(" api call /getProduct")
         
        const productList=await productModel.find()

        
       
       return res.status(200).json({message:"product list send successfully",productList})
    } catch (error) {
        console.log("Error to send product List",error.message)
       return res.status(500).json({message:"Error to get ProductList",error:error.message})
    }
}



export const addToCart = async (req, res) => {
    try {
        const user = req.user;
        console.log("API call: /addToCart");

        const { productId, quantity } = req.body;

        // Check if product exists
        const product = await productModel.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        console.log("Fetched product:", product);

        // Check if cart exists for the user
        let cart = await Cart.findOne({ customerId: user.userId });

        if (!cart) {
            // Create a new cart if not found
            cart = new Cart({
                customerId: user.userId,
                items: [],
                totalAmount: 0,
            });
        }

        // Check if product is already in the cart
        const existingItem = cart.items.find((item) => item.productId.toString() === productId);

        if (existingItem) {
            return res.status(400).json({ message: "Product is already in the cart" });
        }

        // Add new product to cart
        const newCartItem = {
            productId,
            quantity,
            rate: Number(product.rate),
            total: Number(product.rate) * Number(quantity),
        };

        cart.items.push(newCartItem);

        // Update total amount
        cart.totalAmount += newCartItem.total;

        // Save updated cart
        await cart.save();

        console.log("Updated Cart:", cart);

        return res.status(200).json({ message: "Product added to cart successfully", cart });
    } catch (error) {
        console.error("Error adding item to cart:", error.message);
        return res.status(500).json({ message: "Error adding item to cart", error: error.message });
    }
};







export const getCart=async(req,res)=>{
    try {
        const user=req.user
        console.log(" api call /getCart")
           
        const cartList = await Cart.find({ customerId: user.userId }).populate("items.productId");

       if(cartList.length==0){
        return res.status(400).json({message:"No product added  in cart "})
       }
     console.log("cartList.items",cartList)
       return res.status(200).json({message:"product add in cart successfully",cartList})
    } catch (error) {
        console.log("Error to add item in cart",error.message)
       return res.status(500).json({message:"Error to add item in cart",error:error.message})
    }
}





export const removeCartItem = async (req, res) => {
    try {
        console.log("API call: /removeCartItem");
        const user = req.user;
        const { itemId } = req.params;

        // Find the cart first
        const cart = await Cart.findOne({ customerId: user.userId });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        // Find the item to remove
        const itemToRemove = cart.items.find((item) => item._id.toString() === itemId);
        if (!itemToRemove) {
            return res.status(404).json({ message: "Item not found in cart" });
        }

        const itemTotal = itemToRemove.total; // Get item's total before removing

        // Remove item & update totalAmount
        const updatedCart = await Cart.findOneAndUpdate(
            { customerId: user.userId },
            {
                $pull: { items: { _id: itemId } },
                $inc: { totalAmount: -itemTotal } // Reduce totalAmount
            },
            { new: true }
        );

        return res.status(200).json({ message: "Product removed from cart", cart: updatedCart });
    } catch (error) {
        console.error("Error removing item from cart:", error.message);
        return res.status(500).json({ message: "Error removing item from cart", error: error.message });
    }
};




export const changeQuantity = async (req, res) => {
    try {
        console.log("API call: /changeQuantity");
        const user = req.user;
        const { itemCount, itemId } = req.body;

        if (!itemCount || !itemId) {
            return res.status(400).json({ message: "Invalid request. Provide both itemId and itemCount." });
        }

        // Find the cart first
        const cart = await Cart.findOne({ customerId: user.userId });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        // Find the item in the cart
        const itemToUpdate = cart.items.find((item) => item._id.toString() === itemId);
        if (!itemToUpdate) {
            return res.status(404).json({ message: "Item not found in cart" });
        }

        // Calculate the total difference
        const oldTotal = itemToUpdate.total;
        const newTotal = itemToUpdate.rate * itemCount;
        const totalDifference = newTotal - oldTotal;

        // Update quantity and totalAmount
        const updatedCart = await Cart.findOneAndUpdate(
            { customerId: user.userId, "items._id": itemId },
            {
                $set: { "items.$.quantity": itemCount, "items.$.total": newTotal },
                $inc: { totalAmount: totalDifference }
            },
            { new: true }
        );

        return res.status(200).json({ message: "Product quantity updated", cart: updatedCart });
    } catch (error) {
        console.error("Error updating quantity in cart:", error.message);
        return res.status(500).json({ message: "Error updating quantity in cart", error: error.message });
    }
};


