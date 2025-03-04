const connection = require('../config/ConfigDataBase')
const { stringify } = require('flatted');
const { getAllusers, getUpdateUSer, handleUpdateUser, handeDeleteUser, CreateUser, findScoreStudentService } = require('../sevices/CRUDservice')
const getHomePage = async (req, res) => {

    let results = await getAllusers();

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
    console.log('check Usert', user)
    res.render('Edituser.ejs', { userEdit: user })

}
const PostEditUser = async (req, res) => {
    // Using placeholders
    Mssv = req.body.Mssv;
    Myname = req.body.Myname;
    score = req.body.score;


    await handleUpdateUser(email, name, city, UserId)

    res.redirect('/')

}
const GetDeleteUser = async (req, res) => {
    let userID = req.params.id

    let user = await getUpdateUSer(userID)
    res.render('deleteUser.ejs', { userDele: user },)
}
const DeleteUser = async (req, res) => {
    try {


        await handeDeleteUser(req.body)
        res.redirect('/')
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: 1,
            message: ' Err from server'
        })
    }

}
const findScoreStudent = async (req, res) => {
    try {
        mssv = req.body.Mssv
        let Score = await findScoreStudentService(mssv)
        console.log(Score)
        res.status(200).json({ Score: JSON.parse(stringify(Score)) });
    } catch (e) {
        console.log(e)
        res.status(200).json({
            errCode: 1,
            message: 'Err from server'
        })
    }
}
module.exports = { getHomePage, getVietz, PostUser, getCreate, GetEditUser, PostEditUser, GetDeleteUser, DeleteUser, findScoreStudent }