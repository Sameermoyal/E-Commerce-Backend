import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    paymentMode: {
      type: String,
      enum: ["COD", "Card"],
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Shipped", "Delivered"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", OrderSchema);

export default Order


// import mongoose from "mongoose";

// const orderSchema = new mongoose.Schema(
//   {
//     customerId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User", 
//       required: true,
//     },
//     items: [
//       {
//         productId: {
//           type: mongoose.Schema.Types.ObjectId,
//           ref: "Product", 
//           required: true,
//         },
//         quantity: {
//           type: Number,
//           required: true,
//           min: 1,
//         },
//         price: {
//           type: Number,
//           required: true,
//         },
//       },
//     ],
//     totalAmount: {
//       type: Number,
//       required: true,
//     },
//     status: {
//       type: String,
//       enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
//       default: "Pending",
//     },
//     paymentMethod: {
//       type: String,
//       enum: ["COD", "Credit Card", "Debit Card", "PayPal"],
//       required: true,
//     },
//     shippingAddress: {
//       fullName: { type: String, required: true },
//       address: { type: String, required: true },
//       city: { type: String, required: true },
//       postalCode: { type: String, required: true },
//       country: { type: String, required: true },
//     },
//     isPaid: {
//       type: Boolean,
//       default: false,
//     },
//     paidAt: {
//       type: Date,
//     },
//     isDelivered: {
//       type: Boolean,
//       default: false,
//     },
//     deliveredAt: {
//       type: Date,
//     },
//   },
//   { timestamps: true }
// );

// const Order = mongoose.model("Order", orderSchema);

// export default Order;
