const product = require("../models/product.model");

// Create product
exports.createProduct = async (req, res) => {
  try {
    const {
      ProductName,
      ProductDescription,
      discoundPrice,
      prices,
      tag,
      sizes,
      color,
      image,
      inStock,
      category,
      keyword,
    } = req.body;

    // Checking all fields
    if (
      !ProductName ||
      !ProductDescription ||
      !discoundPrice ||
      !prices ||
      !tag ||
      !sizes ||
      !color ||
      !image ||
      !category ||
      !keyword
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide all the required fields",
      });
    }

    const newProduct = new product({
      ProductName,
      ProductDescription,
      discoundPrice,
      prices,
      tag,
      sizes,
      color,
      image,
      inStock,
      category,
      keyword,
    });

    await newProduct.save();
    return res.status(200).json({
      success: true,
      data: newProduct,
      message: "Product added successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Error",
    });
  }
};

// Update product
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedFields = req.body;

    const updatedProduct = await product.findByIdAndUpdate(id, updatedFields, {
      new: true,
    });

    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: updatedProduct,
      message: "Product updated successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Error",
    });
  }
};

// Delete product
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProduct = await product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: {},
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Error",
    });
  }
};

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await product.find();
    if (!products || products.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No Products Found",
      });
    }
    return res.status(200).json({
      success: true,
      data: products,
      message: "Products Found",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Error",
    });
  }
};

// Get a single product
exports.getOneProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const productData = await product.findById(id);

    if (!productData) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: productData,
      message: "Product found",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Error",
    });
  }
};
