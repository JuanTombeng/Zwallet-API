const Joi = require('joi')
const createError = require('http-errors')

// validation for sign up and update user
const userInputValidation = (req, res, next) => {
    const {username, email, password, pin} = req.body
    const convertedPin = pin.toString()
    const validateData = Joi.object({
        username : Joi.string().alphanum().min(5).max(30).required(),
        email : Joi.string().email().lowercase().required(),
        password : Joi.string().min(8).max(16).alphanum().required(),
        pin : Joi.string().length(6).required(),
    })
    const {error} = validateData.validate({
        username : username,
        email : email,
        password : password,
        pin : convertedPin
    })
    if (error) {
        const errorMessage = error.details[0].message
        return next(createError(422, errorMessage))
    } else {
        next()
    }
}

// validation for create transaction
const transactionInputValidation = (req, res, next) => {
    const {from_user_id, to_user_id, amount, transaction_type, notes, status} = req.body
    const validateData = Joi.object({
        from_user_id : Joi.string().required(),
        to_user_id : Joi.string().required(),
        amount : Joi.number().required(),
        transaction_type : Joi.string().required(),
        notes : Joi.string().required(),
    })
    const { error } = validateData.validate({
        from_user_id : from_user_id,
        to_user_id : to_user_id,
        amount : amount,
        transaction_type : transaction_type,
        notes : notes,
    })
    if (error) {
        const errorMessage = error.details[0].message
        return next(createError(422, errorMessage))
    } else {
        next()
    }
}

const resetPasswordValidation = (req, res, next) => {
    const {password, confirmPassword} = req.body
    const validateData = Joi.object({
        password : Joi.string().min(8).max(16).alphanum().required(),
        confirmPassword : Joi.string().min(8).max(16).alphanum().required(),
    })
    const {error} = validateData.validate({
        password : password,
        confirmPassword : confirmPassword
    })
    if (error) {
        const errorMessage = error.details[0].message
        return next(createError(422, errorMessage))
    } else {
        if (password !== confirmPassword) {
            return next(createError(400, 'Password and Confirm Password is not match'))
        } 
        next()
    }

}

module.exports = {
    userInputValidation,
    transactionInputValidation,
    resetPasswordValidation
}
