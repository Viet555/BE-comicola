const { handleCreateProduct, handleGetAlldata, handleDeleteProduct, handleUpdateProduct } = require("../sevices/AdminService")


const CreateNewProduct = async (req, res) => {
    try {
        let data = await handleCreateProduct(req.body)
        return res.status(200).json(data)
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            EC: -1,
            MES: ' ERR Form Sever'
        })
    }
}
const getProductBytype = async (req, res) => {
    try {
        type = req.body.typeProduct
        limit = req.body.limit
        if (!limit) limit = ''
        let dataGet = await handleGetAlldata(type, limit)
        return res.status(200).json(dataGet)
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            EC: 1,
            MEs: 'err from sv'
        })
    }
}
const deleteAproduct = async (req, res) => {
    let id = req.query.id
    console.log(req.query)
    try {
        let response = await handleDeleteProduct(id)
        return res.status(200).json(response)
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            EC: 1,
            MEs: 'err from sv'
        })
    }
}
const updateProduct = async (req, res) => {
    try {
        let dataRes = await handleUpdateProduct(req.body)
        return res.status(200).json(dataRes)
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            EC: 1,
            MEs: 'err from sv'
        })
    }
}
module.exports = { CreateNewProduct, getProductBytype, deleteAproduct, updateProduct }