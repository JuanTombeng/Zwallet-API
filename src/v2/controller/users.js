const bcrypt = require('bcrypt')
const { v4 : uuidv4 } = require('uuid')
const createError = require('http-errors')
const commonHelper = require('../helper/common')
const userQuery = require('../models/users')
const accountQuery = require('../models/accounts')

const signup = async (req, res, next) => {
    try {
        const {username, email, password, pin} = req.body
        const salt = await bcrypt.genSalt()
        const userId = uuidv4()
        const accountId = uuidv4()
        const hashedPassword = await bcrypt.hash(password, salt)
        const userData = {
            id : userId,
            username : username,
            email : email,
            password : hashedPassword,
            pin : pin
        }
        const accountData = {
            id : accountId,
            id_user : userId
        }
        const findEmail = await userQuery.findUserEmail(username, email)
        if (findEmail.length === 0) {
            const newUser = await userQuery.signup(userData)
            const newAccount = await accountQuery.createAccount(accountData)
            if (newUser.affectedRows > 0 && newAccount.affectedRows > 0) {
                const results = {
                    newUser : newUser,
                    newAccount : newAccount
                }
                const payload = {
                    username : username,
                    email : email
                }
                const token = commonHelper.generateToken(payload)
                results.token = token
                commonHelper.sendEmailVerification(email, token)
            }
        } else {
            return next(createError(403, 'Email is already existed. Please choose another email to signup.'))
        }
    } catch (error) {
        console.log(error)
        next(createError(500, new createError.InternalServerError()))
    }
}

const login = async (req, res, next) => {
    try {
        const {email, password} = req.body
        const data = {
            email : email,
            password : password
        }
        const findEmailUser = await userQuery.findUserEmailLogin(email)
        if (findEmailUser.length === 0) {
            commonHelper.response(res, `Login Failed`, 500, `Sorry, We cannot find your email! Please try again.`)
        } else if (findEmailUser[0].email === data.email) {
            const userLogin = await userQuery.login(data)
            if (userLogin[0].active === 1 && userLogin[0].role === 'user') {
                const checkPassword = await bcrypt.compare(data.password, userLogin[0].password)
                if (checkPassword) {
                    const payload = {
                        email : userLogin[0].email,
                        role : userLogin[0].role,
                        active : userLogin[0].active
                    }
                    const token = commonHelper.generateToken(payload)
                    userLogin.token = token
                    commonHelper.response(res, userLogin, 200, `Login is Successful! Welcome back ${findUser[0].username}`)
                } else {
                    commonHelper.response(res, `Login Failed`, 500, `Sorry, your password is wrong! Please try again.`)
                }
            } else {
                commonHelper.response(res, `Login Failed`, 500, `Sorry, your accoutn is not yet activated.`)
            }
        }
    } catch (error) {
        commonHelper.response(res, `Login Failed`, 500, `Sorry, your username or password is wrong! Please try again.`)
    }
}


module.exports = {
    signup,
    login
}