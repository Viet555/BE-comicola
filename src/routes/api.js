const express = require('express')
const { CreateUser, handleLogin, getAllUser, deleteUser, UpdateUser } = require('../controllers/UserController')
const { CreateNewProduct, getProductBytype, deleteAproduct, updateProduct } = require('../controllers/Admincontroller')

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
module.exports = Router