const mongoose = require("mongoose")

const ProductSchema = mongoose.Schema({
    ProductName: {
        type: String,
        required: true
    },
    ProductDescription: {
        type: String,
        required: true
    },
    discoundPrice: {
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
        type: [String],
        required : true
    },
    color: {
        type: [String]
    },
    image: {
        type: [String],
        required : true

    },
    inStock: {
        type: Boolean,
       default:true
    },
    category: {
        type: String
    },
    keyword: {
        type:[String],
    }

})

const Product = mongoose.model("Product",ProductSchema);

module.exports = Product;