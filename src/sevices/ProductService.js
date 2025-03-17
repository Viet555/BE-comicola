const { Connection } = require('mongoose');
const connection = require('../config/ConfigDataBase')
const getdataDetailService = async (id) => {
    try {
        if (!id) {
            return ({
                EC: -1,
                MES: 'Missing Id '
            })
        }
        else {
            let data = await connection.Product.findOne({ _id: id }).populate('markdowns');

            return ({
                EC: 0,
                data: data
            })
        }
    } catch (error) {
        console.log(error)
    }
}
const MarkdownService = (dataMarkDown) => {
    return new Promise(async (resolve, reject) => {

        try {
            if (!dataMarkDown.contentMarkdown || !dataMarkDown.contentHTML || !dataMarkDown.productId || !dataMarkDown.action) {
                resolve({
                    EC: -1,
                    MES: 'no input received'
                })

            } else if (dataMarkDown.action === 'EDIT') {
                let data = await connection.Markdown.findOneAndUpdate(
                    { productId: dataMarkDown.productId },
                    {
                        contentMarkdown: dataMarkDown.contentMarkdown,
                        contentHTML: dataMarkDown.contentHTML,
                    },
                    { new: true } // Ensure the updated document is returned

                )
                if (!data) {
                    return resolve({
                        EC: -1,
                        MES: 'Product not found'
                    });
                }
                resolve({
                    EC: 0,
                    MES: 'Up data Success',
                    data
                })
            }
            else if (dataMarkDown.action === 'CREATE') {
                let check = await connection.Markdown.findOne({ productId: dataMarkDown.productId }
                )

                if (check) {

                    resolve({
                        EC: 3,
                        MES: 'Markdown isExist please update or create new'
                    })
                } else {
                    let data = await connection.Markdown.create({
                        contentHTML: dataMarkDown.contentHTML,
                        contentMarkdown: dataMarkDown.contentMarkdown,
                        productId: dataMarkDown.productId
                    })
                    await connection.Product.findByIdAndUpdate(
                        { _id: dataMarkDown.productId },
                        { $push: { markdowns: data._id } }
                    );
                    resolve({
                        EC: 0,
                        MES: 'Create data Success',
                        data
                    })
                }

            }

        } catch (e) {
            reject(e)
        }
    })
}
const sortProductService = (sort) => {
    return new Promise(async (resolve, reject) => {

        try {
            let data = []
            if (!sort) {
                let dataSort = await connection.Product.find().sort({ createdAt: -1 })
                resolve({
                    EC: 0,
                    MES: 'sort DESC success',
                    dataSort
                })
            }

            if (sort === 'DESC') {
                let dataSort = await connection.Product.find().sort({ createdAt: -1 })
                resolve({
                    EC: 0,
                    MES: 'sort DESC success',
                    dataSort
                })
            }
            if (sort === 'ASC') {
                let dataSort = await connection.Product.find().sort({ createdAt: 1 })
                resolve({
                    EC: 0,
                    MES: 'sort ACS success',
                    dataSort
                })
            }
            if (sort === 'LOWPRICE') {
                let dataSort = await connection.Product.find().sort({ count: 1 })
                resolve({
                    EC: 0,
                    MES: 'sort LOWPRICE success',
                    dataSort
                })
            }
            if (sort === 'HIGHPRICE') {
                let dataSort = await connection.Product.find().sort({ count: -1 })
                resolve({
                    EC: 0,
                    MES: 'sort HIGHPRICE success',
                    dataSort
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

const handleAddtoCart = async (userId, productId, quantity) => {

    try {
        let cart = await connection.Cart.findOne({ userId })

        if (!cart) {
            cart = new connection.Cart({ userId, item: [], totalPrice: 0 });
        }

        let product = await connection.Product.findById(productId)

        if (!product) {
            return (
                {
                    EC: 1,
                    MES: "Product not foul"
                }
            );
        }

        let existingItem = cart.items.find(item => item.productId.toString() === productId)


        let productCount = Number(product.count.toString().replace(/,/g, ''));
        let qty = Number(quantity);

        if (isNaN(productCount) || isNaN(qty)) {
            throw new Error("Invalid product count or quantity");
        }

        if (!cart.totalPrice || isNaN(cart.totalPrice)) {
            cart.totalPrice = 0;
        }
        if (existingItem) {
            existingItem.quantity += qty;
        }

        else {
            cart.items.push({ productId, quantity });
        }
        cart.totalPrice += productCount * qty;
        await cart.save();
        return ({
            EC: 0,
            MES: "Thêm vào giỏ hàng thành công",
            cart
        });


    } catch (error) {
        console.log(error)
    }
}
const handleGetCart = async (userId) => {
    try {
        let cart = await connection.Cart.findOne({ userId }).populate('items.productId', 'nameProduct count image1 typeProduct');
        if (!cart) return res.status(404).json({
            EC: 1,
            MES: "cart is empty"
        });
        return ({ EC: 0, MES: "Lấy giỏ hàng thành công", cart });
    } catch (error) {
        console.log(error)
    }
}
module.exports = { getdataDetailService, MarkdownService, sortProductService, handleAddtoCart, handleGetCart }