const express = require('express')
const { CreateUser, handleLogin, getAllUser, deleteUser, UpdateUser } = require('../controllers/UserController')

const Router = express.Router()

Router.post('/api/CreateUSer', CreateUser)
Router.post('/api/LoginUser', handleLogin)
Router.get('/api/GetAllUser', getAllUser)
Router.put('/api/UpdateUser', UpdateUser)

Router.delete('/api/DeleteUser', deleteUser)
module.exports = Router