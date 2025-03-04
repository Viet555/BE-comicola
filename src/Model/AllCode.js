const mongoose = require('mongoose');

const AllcodeSchema = new mongoose.Schema({
    gender: {
        type: String,
        enum: ['female', 'male', 'other'],
        default: 'other'
    },
    roleId: {
        type: String,
        enum: ['user', 'admin',],
        default: 'user'
    }
});

// ✅ Thêm Virtuals để luôn trả về danh sách gender
AllcodeSchema.virtual('genderOptions').get(function () {
    return ['female', 'male', 'other'];
});
AllcodeSchema.virtual('roleIdOptions').get(function () {
    return ['user', 'admin',];
});

// 🔥 Bật virtuals khi convert sang JSON hoặc Object
AllcodeSchema.set('toJSON', { virtuals: true });
AllcodeSchema.set('toObject', { virtuals: true });


const AllCode = mongoose.model('AllCode', AllcodeSchema);

module.exports = AllCode;
