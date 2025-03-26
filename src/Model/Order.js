const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    email: { type: String },
    items: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
            quantity: { type: Number, required: true },
            price: { type: Number, required: true }
        }
    ],
    totalAmount: { type: Number, required: true },
    status: { type: String, enum: ['Pending', 'Paid', 'Shipped', 'Completed', 'Canceled'], default: 'Pending' },
    paymentMethod: { type: String, enum: ['Credit Card', 'PayPal', 'Crypto', 'COD', 'Cash'], required: true },
    orderCode: { type: String, unique: true },
    address: { type: String, required: true },
    phoneNumber: { type: String, required: true },
}, { timestamps: true });

const Order = mongoose.model('Order', OrderSchema);
module.exports = Order;
