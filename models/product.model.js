const mongoose = require("mongoose");

const SizeAndStock = new mongoose.Schema({
    SizeNumber: {
        type: Number,
        required: [true, "Please provide a size number"] // Changed this
    },
    StockNumber: {
        type: Number,
        default: 10
    }
});

const ProductSchema = new mongoose.Schema({
    ProductName: {
        type: String,
        required: true
    },
    ProductDescription: {
        type: String,
        required: true
    },
    discountPrice: { // Fixed typo here
        type: Number
    },
    prices: {
        type: Number,
        required: true
    },
    tag: {
        type: String
    },
    sizes: {
        type: [SizeAndStock],
        required: true
    },
    color: {
        type: [String]
    },
    image: {
        type: [String],
        required: true
    },
    inStock: {
        type: Boolean,
        default: true
    },
    category: {
        type: String
    },
    keyword: {
        type: [String]
    }
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
