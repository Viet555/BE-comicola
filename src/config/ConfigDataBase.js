const express = require('express');
const mongoose = require('mongoose');
const User = require('../Model/User');
const AllCode = require('../Model/AllCode');
const Product = require('../Model/Product');
const Banner = require('../Model/BannerHome');
const Markdown = require('../Model/Markdown');
const Order = require('../Model/Order');
const Cart = require('../Model/Cart');


connection = mongoose.connect('mongodb://localhost:27017/btaplon', {

})
    .then(() => console.log('Connected to MongoDB Success'))
    .catch(err => console.error('Error connecting to MongoDB:', err));


module.exports = { connection, User, Product, AllCode, Banner, Markdown, Order, Cart };
