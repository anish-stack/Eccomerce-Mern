const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  address: [
    {
      street: { type: String },
      city: { type: String },
      state: { type: String },
      pincode: { type: Number },
      landmark: { type: String },
    },
  ],
  orderStatus: {
    type: String,
    enum: ['Pending', 'Success', 'Delivered', 'Canceled'],
    default: 'Pending', // Optional: Set a default value if needed
  },
}, { timestamps: true }); // Adding timestamps option

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;
