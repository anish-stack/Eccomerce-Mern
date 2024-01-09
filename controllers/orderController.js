const Order = require("../models/order.model");
const Product = require("../models/product.model");
const sendEmail = require("../utils/sendMail");
const User = require("../models/user.model");

exports.CreateOrder = async (req, res) => {
  try {
    const { productId } = req.params;
    const user = req.user?.id;
    const checkUser = await User.findById(user);
    // console.log(checkUser.Email)
    if (!productId || !user) {
      return res.status(400).json({ msg: "No Product or User ID" });
    }

    const { address, orderStatus } = req.body;

    if (!address) {
      return res.status(400).json({ msg: "Please enter all fields" });
    }

    // Fetch product details
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }

    // Create the order using the Order model
    const newOrder = new Order({
      product: productId,
      user,
      address,
      orderStatus,
    });

    // Save the order to the database
    await newOrder.save();
    console.log(newOrder.orderStatus);

    // Send email with order details and congratulatory message
    const Options = {
      email: checkUser.Email,
      subject: "Welcome To Ecommerce Project",
      message: `Congratulations, ${checkUser.Name}! Your order details: \n\nProduct: ${product.ProductName}\nOrder Status: ${newOrder.orderStatus}\n\nThank you for shopping with us!`,
    };

    await sendEmail(Options);

    // Respond with success message or other appropriate response
    res
      .status(201)
      .json({ msg: "Order created successfully", order: newOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal Server Error" });
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
