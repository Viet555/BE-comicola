const express = require('express')
const app = express() //framwork giup chay dc 1 websv
require('dotenv').config();
const webRoutes = require('./routes/web')
const connection = require('./config/ConfigDataBase')


const port = process.env.PORT || 8888;
const hostname = process.env.HOST_NAME;
const configViewEngine = require('./config/viewEngine')

//config req.body => laasy len data
app.use(express.json()) //for json
app.use(express.urlencoded({ extends: true })) //for  form data 

//config viewEngine
configViewEngine(app);

//khai bao route
app.use('/', webRoutes);

app.listen(port, hostname, () => {
    console.log(`example app listening on port ${port}`)
})