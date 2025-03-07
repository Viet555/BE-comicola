const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema({
    nameProduct: { type: String, equired: true, },
    count: { type: String, required: true, },
    note: { type: String, },
    desProduct: { type: String, },
    code: { type: String, },
    image1: { type: String, },
    // images: ["image1.jpg", "image2.jpg", "image3.jpg"],
    image2: { type: String, },
    typeProduct: [{ type: mongoose.Schema.Types.String, ref: "AllCode" }] //=> Tham chiếu đến AllCode
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product 