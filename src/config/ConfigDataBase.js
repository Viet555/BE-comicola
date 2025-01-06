const express = require('express');
const mongoose = require('mongoose');
const User = require('../Model/User');


connection = mongoose.connect('mongodb://localhost:27017/vietz', {

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
//     .then(() => console.log('User saved successfully!', newUser))
//     .catch(err => console.error('Error saving user:', err));


module.exports = { connection, User };
