const express = require('express')
const { CreateUser, handleLogin, getAllUser, deleteUser, UpdateUser } = require('../controllers/UserController')
const { CreateNewProduct, getProductBytype, deleteAproduct, updateProduct, getDataType, createBanner, updateBanner,
    getAllBanner, Deletebanner, fetchAllProductByType } = require('../controllers/Admincontroller')
const { getDetailProduct, handleMarkDown, fetchAllProductBySort, addToCart, getCart, DeleteCart, Ordercheckout, getHistory, productSearch } = require('../controllers/ProductController')

const Router = express.Router()

Router.post('/api/CreateUSer', CreateUser)
Router.post('/api/LoginUser', handleLogin)
Router.get('/api/GetAllUser', getAllUser)
Router.put('/api/UpdateUser', UpdateUser)
Router.delete('/api/DeleteUser', deleteUser)

//product
Router.post('/api/Create-product', CreateNewProduct)
Router.get('/api/getAllproductByType', getProductBytype)
Router.delete('/api/deleteAProduct', deleteAproduct)
Router.put('/api/Update-Product', updateProduct)
Router.get('/api/Search-product', productSearch)
//
Router.get('/api/Get-dataType-product', getDataType)
Router.post('/api/Create-banner', createBanner)
Router.put('/api/update-banner', updateBanner)
Router.get('/api/fetch-all-banner', getAllBanner)
Router.delete('/api/Delete-banner', Deletebanner)

Router.get('/fetchAllProduct-byType', fetchAllProductByType)
Router.get('/getAproduct-Detail', getDetailProduct)
Router.get('/fetchAllProduct-bySort', fetchAllProductBySort)
//Markdown
Router.post('/Create-Update-Markdown', handleMarkDown)
//cart
Router.post('/add-product-tocart', addToCart)
Router.get('/get-product-tocart', getCart)
Router.delete('/Delete-product-cart-User', DeleteCart)
Router.post('/Ordercheckout-Product', Ordercheckout)
Router.get('/api/getHistory-Order', getHistory)
module.exports = Router