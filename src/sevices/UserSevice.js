const connection = require('../config/ConfigDataBase')

const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
const CreateUserService = (dataUser) => {
    return new Promise(async (resolve, reject) => {

        try {
            if (!dataUser.firstName || !dataUser.lastName || !dataUser.email || !dataUser.password) {

                resolve({
                    EC: -1,
                    MES: ' Missing Input params'
                })
            }
            let checkEmail = await checkUserEmail(dataUser.email)
            if (checkEmail === true) {
                resolve({
                    EC: 1,
                    MES: 'email already exists'
                })
            }
            let hashPasswordUser = await hashUserPassword(dataUser.password)
            if (checkEmail == false) {
                if (!dataUser.roleId) {
                    dataUser.roleId = 'User'
                }
                let data = await connection.User.create({
                    firstName: dataUser.firstName,
                    lastName: dataUser.lastName,
                    password: hashPasswordUser,
                    email: dataUser.email,
                    roleId: dataUser.roleId,
                    image: dataUser.image,
                    gender: dataUser.gender,
                    address: dataUser.address,
                })
                resolve({
                    EC: 0,
                    MES: 'CREATE SUCCESS',
                    data
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}
const checkUserEmail = (Useremail) => {

    return new Promise(async (resolve, reject) => {

        try {


            let user = await connection.User.findOne(
                { email: Useremail }
            )

            if (user) {
                resolve(true)

            } else {
                resolve(false)
            }
        } catch (e) {
            reject(e)
        }
    })
}
const hashUserPassword = (password) => {
    return new Promise((resolve, reject) => {
        try {
            let hashPassword = bcrypt.hashSync(password, salt);
            resolve(hashPassword)
        } catch (e) {
            reject(e)
        }
    })
}
const UserLogin = async (dataLog) => {
    return new Promise(async (resolve, reject) => {

        try {
            if (!dataLog.email || !dataLog.password) {
                resolve({
                    EC: -1,
                    MES: 'Missing Input !'
                })
            }

            let isexist = await checkUserEmail(dataLog.email)

            if (isexist) {

                let user = await connection.User.findOne(
                    { email: dataLog.email },

                )
                console.log(user)
                if (user) {
                    //sspass
                    let checkPass = await bcrypt.compareSync(dataLog.password, user.password)
                    if (checkPass) {
                        resolve({
                            EC: 0,
                            MES: ' OK',
                            data: user
                        })
                        delete user.password
                    }
                    else {
                        resolve({
                            EC: 3,
                            MES: "Oh no! Wrong password"
                        })
                    }
                }
                else {
                    resolve({
                        EC: 2,
                        MES: `User not found`
                    })
                }
            }
            else {
                resolve({
                    EC: -1,
                    MES: `Email don't exist`
                })
            }


        } catch (e) {
            reject(e)
        }
    })
}
const handleGetAllUser = (id) => {
    return new Promise(async (resolve, reject) => {


        try {
            let dataUsers = ''
            if (id === 'ALL') {
                let dataUsers = await connection.User.find().select('-password')

                resolve({
                    EC: 0,
                    MES: 'fetch All Success',
                    data: dataUsers
                }
                )
            }
            if (id && id !== 'ALL') {
                let dataUsers = await connection.User.findOne(
                    { _id: id }
                ).select('-password')
                if (dataUsers) {
                    resolve({
                        EC: 0,
                        MES: 'fetch User Success',
                        data: dataUsers
                    }
                    )
                }
                else {
                    resolve({
                        EC: -1,
                        MES: 'USER NOT FOUND !'
                    })
                }


            }
            // resolve({
            //     Ec: 0,
            //     MES: 'Fetch All User SS',
            //     data: dataUsers
            // })



        } catch (e) {
            reject(e)
        }
    })
}
const handleDeleteUser = (UserId) => {
    console.log(UserId)
    return new Promise(async (resolve, reject) => {

        try {
            if (!UserId) {
                resolve({
                    EC: '-1',
                    MES: "missing input params"
                })
            }
            else {
                await connection.User.deleteOne({ _id: UserId })
                resolve({
                    EC: 0,
                    MES: 'Delete User Success'
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}
const handleUpdateUser = (dataEdit) => {
    return new Promise(async (resolve, reject) => {

        try {
            if (!dataEdit._id) {
                resolve({
                    EC: -1,
                    MES: 'Missing Input Id '
                })
            }
            let User = await connection.User.findOneAndUpdate({
                _id: dataEdit._id
            },
                {
                    firstName: dataEdit.firstName,
                    lastName: dataEdit.lastName,
                    address: dataEdit.address,
                    roleId: dataEdit.roleId,
                    gender: dataEdit.gender,
                    phoneNumber: dataEdit.phoneNumber,
                    image: dataEdit.avatar,
                }
            )

            if (!User) {
                return resolve({
                    EC: -1,
                    MES: 'User not found'
                });
            }

            resolve({
                EC: 0,
                MES: 'User updated successfully',
                data: User
            });

        } catch (e) {
            reject(e)
        }
    })
}
module.exports = { CreateUserService, UserLogin, handleGetAllUser, handleDeleteUser, handleUpdateUser }