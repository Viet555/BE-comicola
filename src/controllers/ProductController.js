const { getdataDetailService, MarkdownService, sortProductService, handleAddtoCart, handleGetCart } = require("../sevices/ProductService")

const getDetailProduct = async (req, res) => {
    try {
        let id = req.query.id
        let dataDetail = await getdataDetailService(id)
        return res.status(200).json(dataDetail)
    } catch (e) {
        console.log(e)
        return res.status(400).json({
            EC: 1,
            MES: 'Err from sv'
        })
    }
}
const handleMarkDown = async (req, res) => {
    try {

        let dataDeMarkdown = await MarkdownService(req.body)
        return res.status(200).json(dataDeMarkdown)
    } catch (e) {
        console.log(e)
        return res.status(400).json({
            EC: 1,
            MES: 'Err from sv'
        })
    }
}
const fetchAllProductBySort = async (req, res) => {
    try {
        let sort = req.query.sort

        let dataSort = await sortProductService(sort)
        return res.status(200).json(dataSort)
    } catch (e) {
        console.log(e)
        return res.status(400).json({
            EC: 1,
            MES: 'Err from sv'
        })
    }
}
const addToCart = async (req, res) => {
    try {

        let { userId, productId, quantity } = req.body
        let response = await handleAddtoCart(userId, productId, quantity)
        return res.status(200).json(response)
    } catch (e) {
        console.log(e)
        return res.status(404).json({
            EC: 1,
            MES: 'err From sv'
        })
    }
}
const getCart = async (req, res) => {
    try {
        let { userId } = req.query;
        let response = await handleGetCart(userId)
        return res.status(200).json(response)

    } catch (e) {
        console.log(e)
        return res.status(404).json({
            EC: 1,
            MES: 'err From sv'
        })
    }
}
module.exports = { getDetailProduct, handleMarkDown, fetchAllProductBySort, addToCart, getCart }