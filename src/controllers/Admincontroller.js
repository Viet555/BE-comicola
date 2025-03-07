const { handleCreateProduct, handleGetAlldata, handleDeleteProduct, handleUpdateProduct, handleGetDataTypes, handleGetAlldataPagiNate } = require("../sevices/AdminService")


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
        type = req.query.type
        limit = req.query.limit
        page = req.query.page
        if (!limit) limit = '6'

        let dataGet = await handleGetAlldataPagiNate(type, limit, page)
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
const getDataType = async (req, res) => {
    try {
        let type = await handleGetDataTypes()
        return res.status(200).json(type)
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            EC: 1,
            MEs: 'err from sv'
        })

    }
}
module.exports = { CreateNewProduct, getProductBytype, deleteAproduct, updateProduct, getDataType }