const connection = require('../config/ConfigDataBase')

const handleCreateProduct = (dataProduct) => {

    return new Promise(async (resolve, reject) => {
        try {
            if (!dataProduct.nameProduct || !dataProduct.count || !dataProduct.desProduct || !dataProduct.code || !dataProduct.typeProduct || !dataProduct.image1) {
                resolve({
                    EC: 1,
                    MES: 'Missing Input Params'
                })
            }
            else {
                let check = await checkCodeProduct(dataProduct.code)
                if (check === true) {
                    resolve({
                        EC: 2,
                        MES: 'code already exists'
                    })
                }
                else {
                    let data = await connection.Product.create({
                        nameProduct: dataProduct.nameProduct,
                        count: dataProduct.count,
                        note: dataProduct.note,
                        desProduct: dataProduct.desProduct,
                        code: dataProduct.code,
                        typeProduct: dataProduct.typeProduct,
                        image1: dataProduct.image1,
                        image2: dataProduct.image2
                    })
                    resolve({
                        EC: 0,
                        MES: 'Create Product Success ',

                    })
                }

            }
        } catch (e) {
            reject(e)
        }
    })
}
const checkCodeProduct = async (codePro) => {
    try {
        let check = await connection.Product.findOne({ code: codePro })
        if (check) {
            return (true)
        } else {
            return (false)
        }
    } catch (e) {
        console.log(e)
    }
}
const handleGetAlldataPagiNate = (type, limit, page) => {
    return new Promise(async (resolve, reject) => {

        try {

            let totalProduct = await connection.Product.countDocuments();

            let totalPages = Math.ceil(totalProduct / limit);

            let product = ''
            if (type) {
                let product = await connection.Product.find({ typeProduct: type })
                    .limit(limit)
                    .skip((page - 1) * limit)
                if (product) {
                    resolve({
                        EC: 0,
                        MES: 'Fecth product ok ',
                        data: product,
                        totalPages: totalPages,
                        currentPage: page
                    })
                } else {

                    resolve({
                        EC: 2,
                        MES: 'Product not foul',

                    })
                }

            }
            else {

                let product = await connection.Product.find()
                    .limit(limit)
                    .skip((page - 1) * limit)
                resolve({
                    EC: 0,
                    MES: 'Fecth All Product ok ',
                    data: product,
                    totalPages: totalPages,
                    currentPage: page
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}
const handleDeleteProduct = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id) {
                resolve({
                    EC: -1,
                    MES: 'Missing ID'
                })
            } else {
                let product = await connection.Product.findOne({ _id: id })
                if (product) {
                    await connection.Product.deleteOne({ _id: id })
                    resolve({
                        EC: 0,
                        MES: 'Delete product Success'
                    })
                }
                else {
                    resolve({
                        EC: 2,
                        MES: 'Product does not exist'
                    })
                }

            }
        } catch (e) {
            reject(e)
        }
    })
}
const handleUpdateProduct = (ProductId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!ProductId._id) {
                resolve({
                    EC: -1,
                    MES: 'Missing ID'
                })
            }
            let dataUpdate = await connection.Product.findByIdAndUpdate(
                { _id: ProductId._id },
                {
                    nameProduct: ProductId.nameProduct,
                    count: ProductId.count,
                    note: ProductId.note,
                    desProduct: ProductId.desProduct,
                    code: ProductId.code,
                    typeProduct: ProductId.typeProduct,
                    image1: ProductId.image1,
                    image2: ProductId.image2
                }
            )
            if (!dataUpdate) {
                return resolve({
                    EC: -1,
                    MES: 'Product not found'
                });
            }

            resolve({
                EC: 0,
                MES: 'Product updated successfully',
            });
        } catch (e) {
            reject(e)
        }
    })
}
const handleGetDataTypes = async () => {
    try {
        let dataType = await connection.AllCode.find()
        if (dataType) {
            return ({
                EC: 0,
                MES: 'Fetch Success',
                data: dataType
            })
        } else {
            return ({
                EC: -2,
                MES: 'Err '
            })
        }
    } catch (e) {
        console.log(e)
    }
}
module.exports = { handleCreateProduct, handleGetAlldataPagiNate, handleDeleteProduct, handleUpdateProduct, handleGetDataTypes }