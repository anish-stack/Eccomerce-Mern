const product = require("../models/product.model");

// Create product
exports.createProduct = async (req, res) => {
  try {
    console.log('Received request body:', req.body);

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
    const missingFields = [];

    if (!ProductName) missingFields.push('ProductName');
    if (!ProductDescription) missingFields.push('ProductDescription');
    if (!discoundPrice) missingFields.push('discoundPrice');
    if (!prices) missingFields.push('prices');
    if (!tag) missingFields.push('tag');
    if (!sizes) missingFields.push('sizes');
    if (!color) missingFields.push('color');
    if (!image) missingFields.push('image');
    if (!category) missingFields.push('category');
    if (!keyword) missingFields.push('keyword');

    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all the required fields',
        missingFields: missingFields,
      });
    }

    // Rest of your code for creating the product
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

    return res.status(201).json({
      success: true,
      message: 'Product created successfully',
    });
  } catch (error) {
    console.error('Error creating product:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

// Update product
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedFields = req.body;

    const updatedProduct = await product.findByIdAndUpdate(
      id,
      { $set: updatedFields },
      { new: true }
    );

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
