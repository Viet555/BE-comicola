const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema({
    nameProduct: { type: String, equired: true, },
    count: { type: String, required: true, },
    note: { type: String, },
    desProduct: { type: String, },
    code: { type: String, },
    image1: { type: String, },
    image2: { type: String, },
    typeProduct: { type: String, },

});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product 