const { getdataDetailService, MarkdownService } = require("../sevices/ProductService")

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
module.exports = { getDetailProduct, handleMarkDown }