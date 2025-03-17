const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true, },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: String, },
    gender: { type: String, },
    roleId: { type: String, },
    image: { type: String, },
    phoneNumber: { type: String, },
    positionId: { type: String, },
    cart: { type: mongoose.Schema.Types.ObjectId, ref: 'Cart' },
});

const User = mongoose.model('User', userSchema);

module.exports = User 