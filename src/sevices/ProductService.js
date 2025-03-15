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
                let data = await connection.Markdown.findByIdAndUpdate(
                    { _id: dataMarkDown.productId },
                    {
                        contentMarkdown: dataMarkDown.contentMarkdown,
                        contentHTML: dataMarkDown.contentHTML,
                    }

                )
                resolve({
                    errCode: 0,
                    message: 'Up data Success',
                    data
                })
            }
            else if (dataMarkDown.action === 'CREATE') {
                let check = await connection.Markdown.findOne({ productId: dataMarkDown.productId }
                )

                if (check) {

                    resolve({
                        ECL: 3,
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
                        errCode: 0,
                        message: 'Create data Success',
                        data
                    })
                }

            }

        } catch (e) {
            reject(e)
        }
    })
}


module.exports = { getdataDetailService, MarkdownService }