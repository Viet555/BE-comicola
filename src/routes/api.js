const express = require('express')
const { CreateUser, handleLogin, getAllUser, deleteUser, UpdateUser, handleRefreshToken } = require('../controllers/UserController')
const { CreateNewProduct, getProductBytype, deleteAproduct, updateProduct, getDataType, createBanner, updateBanner,
    getAllBanner, Deletebanner, fetchAllProductByType } = require('../controllers/Admincontroller')
const { getDetailProduct, handleMarkDown, fetchAllProductBySort, addToCart, getCart, DeleteCart,
    Ordercheckout, getHistory, productSearch, statusOrder } = require('../controllers/ProductController')
const { authMiddleware, authorize } = require('../Middleware/JWTAction')

const Router = express.Router()
//user
Router.post('/api/CreateUSer', CreateUser)
Router.post('/api/LoginUser', handleLogin)

Router.get('/api/GetAllUser', authorize(['admin']), getAllUser)
Router.put('/api/UpdateUser', authMiddleware, UpdateUser)
Router.delete('/api/DeleteUser', authMiddleware, authorize(['admin']), deleteUser)

//product
Router.post('/api/Create-product', authMiddleware, authorize(['admin']), CreateNewProduct)
Router.get('/api/getAllproductByType', getProductBytype)
Router.delete('/api/deleteAProduct', authMiddleware, authorize(['admin']), deleteAproduct)
Router.put('/api/Update-Product', authMiddleware, authorize(['admin']), updateProduct)
Router.get('/api/Search-product', productSearch)
//banner
Router.get('/api/Get-dataType-product', getDataType)
Router.post('/api/Create-banner', authMiddleware, authorize(['admin']), createBanner)
Router.put('/api/update-banner', authMiddleware, authorize(['admin']), updateBanner)
Router.get('/api/fetch-all-banner', getAllBanner)
Router.delete('/api/Delete-banner', authMiddleware, authorize(['admin']), Deletebanner)

Router.get('/fetchAllProduct-byType', fetchAllProductByType)
Router.get('/getAproduct-Detail', getDetailProduct)
Router.get('/fetchAllProduct-bySort', fetchAllProductBySort)
//Markdown
Router.post('/Create-Update-Markdown', authMiddleware, authorize(['admin']), handleMarkDown)
//cart
Router.post('/add-product-tocart', authMiddleware, addToCart)
Router.get('/get-product-tocart', authMiddleware, getCart)
Router.delete('/Delete-product-cart-User', authMiddleware, DeleteCart)
Router.post('/Ordercheckout-Product', authMiddleware, Ordercheckout)
///orders
Router.get('/api/getHistory-Order', authMiddleware, getHistory)
Router.put('/api/confirm-status-order', authMiddleware, authorize(['admin']), statusOrder)
//ref Token
Router.post('/refresh-token', handleRefreshToken)
module.exports = Router