const express = require('express');
const mongoose = require('mongoose');
const User = require('../Model/User');
const AllCode = require('../Model/AllCode');
const Product = require('../Model/Product');


connection = mongoose.connect('mongodb://localhost:27017/btaplon', {

})
    .then(() => console.log('Connected to MongoDB Success'))
    .catch(err => console.error('Error connecting to MongoDB:', err));


// const userSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     age: { type: Number, required: false },
// });

// const User = mongoose.model('User', userSchema);


// const newUser = new User({
//     name: 'cc',
//     email: 'abdce@gmail',
//     age: 40,
// });

// newUser.save()



// async function getData() {
//     const data = await AllCode.find();
//     console.log(JSON.stringify(data, null, 2));
// }

// getData();
module.exports = { connection, User, Product };
