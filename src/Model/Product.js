const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema({
    nameProduct: { type: String, required: true, },
    stock: { type: Number, required: true, default: 0 },
    count: {
        type: Number, get: (value) => {
            if (value === undefined || value === null) {
                return value; // Trả về nguyên giá trị nếu nó là undefined hoặc null
            }
            return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        }, required: true,
        // set: (value) => {

        //     return Number(value.toString().replace(/,/g, ''));// get khi lay // set khi luu
        // },
        // required: true,
    },
    note: { type: String, },
    desProduct: { type: String, required: true, },
    code: { type: String, required: true, },
    image1: { type: String, required: true, },
    image2: { type: String, },
    bannerProduct: { type: String },
    typeProduct: [{ type: mongoose.Schema.Types.String, required: true, ref: "AllCode" }], //=> allcode
    markdowns: [{ type: mongoose.Schema.Types.ObjectId, ref: "Markdown" }]
}, { timestamps: true });
ProductSchema.set('toJSON', { getters: true }); // Áp dụng getter khi chuyển đổi thành JSON
ProductSchema.set('toObject', { getters: true }); // Áp dụng getter khi chuyển đổi thành object
const Product = mongoose.model('Product', ProductSchema);

module.exports = Product 