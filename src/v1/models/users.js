const connection = require('../config/dbConfig.js')

const signup = (data) => {
    return new Promise ((resolve, reject) => {
        const sql = `INSERT INTO users SET ?`
        connection.query(sql, data, (error, result) => {
            if (!error) {
                resolve(result)
            } else {
                reject(error)
            }
        })
    })
}

const findUserEmail = (username, email) => {
    return new Promise ((resolve, reject) => {
        const sql = `SELECT email from users WHERE username = ? AND email = ?`
        connection.query(sql, [username, email], (error, result) => {
            if (!error) {
                resolve(result)
            } else {
                reject(error)
            }
        })
    })
}

const updateVerifiedUser = (username, email) => {
    return new Promise ((resolve, reject) => {
        const sql = `UPDATE users SET active = 1 WHERE username = ? AND email = ?`
        connection.query(sql, [username, email], (error, result) => {
            if (!error) {
                resolve(result)
            } else {
                reject(error)
            }
        })
    })
}

const login = (data) => {
    return new Promise ((resolve, reject) => {
        const findUserQuery = `SELECT users.id, users.first_name, users.last_name, users.email, users.password, users.pin,
        users.active, users.role, accounts.id AS id_account FROM users INNER JOIN accounts ON users.id = accounts.id_user 
        WHERE users.email = ?`
        connection.query(findUserQuery, data.email, (error, result) => {
            if (!error) {
                resolve(result)
            } else {
                reject(error)
            }
        })
    })
}

const findUserEmailLogin = (email) => {
    return new Promise ((resolve, reject) => {
        const sql = `SELECT email from users WHERE email = ?`
        connection.query(sql, email, (error, result) => {
            if (!error) {
                resolve(result)
            } else {
                reject(error)
            }
        })
    })
}


const getUsers = ({search, sort, order, limit, offset}) => {
    return new Promise((resolve, reject) => {
        let sql = `SELECT users.id, accounts.id AS id_accounts, users.email, users.pin, users.first_name, users.last_name,
                users.phone_number FROM users INNER JOIN accounts ON users.id = accounts.id_user`
        if (search) {
            sql += ` WHERE users.first_name LIKE '%${search}%' ORDER BY users.${order} ${sort} LIMIT ${limit} OFFSET ${offset}`
        } else {
            sql += ` ORDER BY users.${order} ${sort} LIMIT ${limit} OFFSET ${offset}`
        }
        connection.query(sql, (error, result) => {
            if (!error) {
                resolve(result)
            } else {
                reject(error)
            }
        })
    })
}

const getUserDetails = (userId) => {
    return new Promise ((resolve, reject) => {
        const sql = `SELECT users.id, users.email, users.first_name, users.last_name, users.pin,
        users.phone_number, users.profile_picture, accounts.id AS id_accounts, accounts.balance, accounts.income,
        accounts.outcome FROM users INNER JOIN accounts ON users.id = accounts.id_user WHERE users.id = ?`
        connection.query(sql, userId, (error, result) => {
            if (!error) {
                resolve(result)
            } else {
                reject(error)
            }
        })
    })
}



const countUsers = () => {
    return new Promise ((resolve, reject) => {
        const sql = `SELECT COUNT(*) AS total FROM users`
        connection.query(sql, (error, result) => {
            if (!error) {
                resolve(result)
            } else {
                reject(error)
            }
        })
    })
}


const updateUser = (userId, data) => {
    return new Promise ((resolve, reject) => {
        const sql = `UPDATE users SET ? WHERE id = ?`
        connection.query(sql, [data, userId], (error, result) => {
            if (!error) {
                resolve(result)
            } else {
                reject(error)
            }
        })
    })
}


const deleteUser = (userId) => {
    return new Promise ((resolve, reject) => {
        const sql = `DELETE FROM users WHERE id = ?`
        connection.query(sql, userId, (error, result) => {
            if (!error) {
                resolve(result)
            } else {
                reject(error)
            }
        })
    })
}

module.exports = {
    signup,
    findUserEmail,
    updateVerifiedUser,
    login,
    findUserEmailLogin,
    getUsers,
    getUserDetails,
    countUsers,
    updateUser,
    deleteUser
}


