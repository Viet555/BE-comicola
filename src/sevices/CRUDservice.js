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
            if (!dataInput.name || !dataInput.email || !dataInput.age) {
                resolve({
                    errCode: -1,
                    message: "missing input params !!!"
                })
            }
            let data = await connection.User.create({
                name: dataInput.name,
                age: dataInput.age,
                email: dataInput.email
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
    let [results, fields] = await connection.query('select * from Users WHERE id = ?', [userID])
    let user = results && results.length > 0 ? results[0] : {}
    return user;

}
const handleUpdateUser = async (email, namee, city, UserId) => {
    const [results, fields] = await connection.query(
        `UPDATE Users
        SET email = ?, name = ?, city =?
        WHERE id = ? `, [email, namee, city, UserId],
    );
}

const handeDeleteUser = async (id) => {
    const [results, fields] = await connection.query(`DELETE FROM Users WHERE id = ?`, [id]);
}
module.exports = { getAllusers, getUpdateUSer, handleUpdateUser, handeDeleteUser, CreateUser };