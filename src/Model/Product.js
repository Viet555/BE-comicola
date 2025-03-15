const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema({
    nameProduct: { type: String, required: true, },
    count: { type: String, required: true, },
    note: { type: String, },
    desProduct: { type: String, required: true, },
    code: { type: String, required: true, },
    image1: { type: String, required: true, },
    // images: ["image1.jpg", "image2.jpg", "image3.jpg"],
    image2: { type: String, },
    bannerProduct: { type: String },
    typeProduct: [{ type: mongoose.Schema.Types.String, required: true, ref: "AllCode" }], //=> allcode
    markdowns: [{ type: mongoose.Schema.Types.ObjectId, ref: "Markdown" }]
}, { timestamps: true });

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product 