const Order = require("../models/order.model");
const Product = require("../models/product.model");
const sendEmail = require("../utils/sendMail");
const User = require("../models/user.model");
const Payment = require("../models/PaymentModal");
exports.CreateOrder = async (req, res) => {
  try {
    const { formData } = req.body;

    if (!formData) {
      return res.status(400).json({ error: "Invalid request data" });
    }

    const { cartItems, address } = formData;

    // Check if cartItems or address is empty
    if (!cartItems || Object.keys(cartItems).length === 0 || !address) {
      return res.status(422).json({ error: "Cart items or address is empty" });
    }

    const userId = req.user.id; // Assuming user ID is retrieved correctly

    const newOrder = new Order({
      product: cartItems,
      address,
      user: userId
    });

    await newOrder.save();

    return res.status(201).json({
      success: true,
      msg: "Order created",
      newOrder
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

//order for me
exports.orderForMe = async (req, res) => {
  try {
    const user = req.user?.id;
    // Get all orders from the database where the user is equal to the authenticated user

    const CheckUserInOrder = await Order.find({ user });

    if (!CheckUserInOrder.length > 0) {
      return res.status(404).json({
        success: false,
        message: "No Order Found",
      });
    }

    // console.log(CheckUserInOrder)

    res.status(201).json({
      success: true,
      message: " Order Found",
      data: CheckUserInOrder.reverse(),
    });
  } catch (error) {
    console.log(error);
    res.status(501).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

//order for admin

exports.orderForAdmin = async (req, res) => {
  try {
    const CheckUserInOrder = await Order.find();

    if (!CheckUserInOrder.length > 0) {
      return res.status(404).json({
        success: false,
        message: "No Order Found",
      });
    }

    // console.log(CheckUserInOrder)

    res.status(201).json({
      success: true,
      message: "Admin Order Found",
      data: CheckUserInOrder,
    });
  } catch (error) {
    console.log(error);
    res.status(501).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

//update order
exports.UpdateOrderStatus = async (req, res) => {
  try {
    const orderId = req.params.orderId; // Extract orderId from route parameters
    const { status } = req.body;
    // Find order details
    const orderDetails = await Order.findById(orderId);
    //   console.log(orderDetails);

    // Check if orderDetails is null, indicating that the order with the given ID was not found
    if (!orderDetails) {
      return res.status(404).json({ msg: "Order not found" });
    }
    // Check if the order is already delivered, then don't allow marking as canceled
    if (orderDetails.orderStatus === "Delivered" && status === "Canceled") {
      return res
        .status(400)
        .json({ msg: "Cannot mark as canceled, order is already delivered" });
    }

    // Check if the order is already canceled, then don't allow marking as delivered
    if (orderDetails.orderStatus === "Canceled" && status === "Delivered") {
      return res
        .status(400)
        .json({ msg: "Cannot mark as delivered, order is already canceled" });
    }

    // Find and update the order status
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { $set: { orderStatus: status } },
      { new: true }
    );

    // Respond with the updated order or other appropriate response
    res.json({ msg: "Order status updated successfully", order: updatedOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

exports.getTransactionID = async(req,res)=>{

  try {
    const OrderId = req.params.OrderId
    //check Orderid In Payment Modal

    const checkOrder = await Payment.findOne({order:OrderId})
    if(!checkOrder){
      return res.status(403).json({
        success:true,
        msg:"No _order Found"
      })
    }
    //send Transaction Id
    const TransactionId  = checkOrder.tranxTionId
    res.status(201).json({
      success:true,
      data:TransactionId
    })
  } catch (error) {
    console.log(error)
  }


}