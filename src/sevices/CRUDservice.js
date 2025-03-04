const connection = require('../config/ConfigDataBase')
const getAllusers = async () => {
    try {
        const User = await connection.User.find({
        });
        return User;
    } catch (e) {
        console.log(e)
    }
}
const CreateUser = (dataInput) => {
    return new Promise(async (resolve, reject) => {

        try {

            if (!dataInput.name || !dataInput.Mssv || !dataInput.score) {
                resolve({
                    errCode: -1,
                    message: "missing input params !!!"
                })
            }
            let data = await connection.User.create({
                name: dataInput.name,
                score: dataInput.score,
                Mssv: dataInput.Mssv
            })
            resolve({
                errCode: 0,
                message: 'Create Success'
            })
        } catch (e) {
            reject(e)
        }
    })
}
const getUpdateUSer = async (userID) => {

    return new Promise(async (resolve, reject) => {
        try {
            if (!userID) {
                resolve({
                    errCode: -1,
                    message: 'Missing input params !!!!'
                })
            }

            let dataUser = await connection.User.findOne({
                where: { _id: userID },

            })
            console.log(dataUser)
            if (dataUser) {
                resolve({
                    errCode: 0,
                    data: dataUser
                })
            } else {
                resolve({
                    errCode: - 1,
                    message: 'Err'
                })
            }



        } catch (e) {
            reject(e)
        }
    })
    // let [results, fields] = await connection.query('select * from Users WHERE id = ?', [userID])
    // let user = results && results.length > 0 ? results[0] : {}
    // return user;

}
const handleUpdateUser = async (email, namee, city, UserId) => {
    return new Promise(async (resolve, reject) => {
        try {

        } catch (e) {
            reject(e)
        }
    })
    // const [results, fields] = await connection.query(
    //     `UPDATE Users
    //     SET email = ?, name = ?, city =?
    //     WHERE id = ? `, [email, namee, city, UserId],
    // );
}

const handeDeleteUser = async (data) => {

    return new Promise(async (resolve, reject) => {
        try {
            let dataUser = connection.User.findOne({
                where: { _id: data.UserId }
            })
            if (dataUser) {
                connection.User.deleteOne({
                    _id: data.userId
                })
            }
            else {
                resolve({
                    errCode: -1,
                    message: 'User Not foul'
                })
            }

            resolve({
                errCode: 0,
                message: 'delete Success'
            })
        } catch (e) {
            reject(e)
        }
    })
}
//
const findScoreStudentService = (Mssv) => {
    return new Promise((resolve, reject) => {
        try {
            console.log(Mssv)
            if (!Mssv) {
                resolve({
                    errCode: -1,
                    message: 'missing Input Mssv'
                })
            }

            else {
                let score = connection.User.findOne({
                    where: { Mssv: Mssv },
                    raw: true,
                    logging: false,

                })
                resolve({
                    errCode: 0,
                    data: score
                })
                if (!score) {
                    resolve({
                        errCode: 2,
                        message: 'Student Not found'
                    })
                }
            }
        } catch (e) {
            reject(e)
        }
    })
}
module.exports = { getAllusers, getUpdateUSer, handleUpdateUser, handeDeleteUser, CreateUser, findScoreStudentService };