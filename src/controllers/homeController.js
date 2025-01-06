const connection = require('../config/ConfigDataBase')
const { getAllusers, getUpdateUSer, handleUpdateUser, handeDeleteUser, CreateUser } = require('../sevices/CRUDservice')
const getHomePage = async (req, res) => {

    let results = await getAllusers();
    console.log("check result :", results)
    return res.render('Home.ejs', { listUser: results })

}
const getVietz = (req, res) => {
    res.render('sample.ejs')
}
const PostUser = async (req, res) => {

    try {

        let data = await CreateUser(req.body)
        return res.status(200).json(data)
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            message: 'err form sv',
            errCode: 1
        })
    }

}
const getCreate = (req, res) => {
    res.render('create.ejs')
}
const GetEditUser = async (req, res) => {
    let userID = req.params.id
    let user = await getUpdateUSer(userID)
    res.render('Edituser.ejs', { userEdit: user })

}
const PostEditUser = async (req, res) => {
    // Using placeholders
    email = req.body.email;
    namee = req.body.Myname;
    city = req.body.city;
    UserId = req.body.UserId

    await handleUpdateUser(email, namee, city, UserId)

    res.redirect('/')

}
const GetDeleteUser = async (req, res) => {
    let userID = req.params.id

    let user = await getUpdateUSer(userID)
    res.render('deleteUser.ejs', { userDele: user })
}
const postDeleteUser = async (req, res) => {
    const id = req.body.UserId
    console.log("check ", id)
    await handeDeleteUser(id)
    res.redirect('/')

}
module.exports = { getHomePage, getVietz, PostUser, getCreate, GetEditUser, PostEditUser, GetDeleteUser, postDeleteUser }