const connection = require('../config/dbConfig.js')

const createAccount = (data) => {
    return new Promise ((resolve, reject) => {
        const sql = `INSERT INTO accounts SET ?`
        connection.query(sql, data, (error, result) => {
            if (!error) {
                resolve(result)
            } else {
                reject(error)
            }
        })
    })
}

const getAccounts = ({sort, order, limit, offset}) => {
    return new Promise ((resolve, reject) => {
        let sql = `SELECT users.username, users.email, users.first_name, users.last_name, accounts.id as account_id, accounts.id_user, 
                accounts.balance FROM users INNER JOIN accounts ON users.id = accounts.id_user`
        if (order) {
            sql += ` ORDER BY accounts.${order} ${sort} LIMIT ${limit} OFFSET ${offset}`
        }
        connection.query(sql, (error, result) => {
            if(!error) {
                resolve(result)
            } else {
                reject(error)
            }
        })
    })
}

const countAccounts = () => {
    return new Promise ((resolve, reject) => {
        const sql = `SELECT COUNT(*) AS total FROM accounts`
        connection.query(sql, (error, result) => {
            if (!error) {
                resolve(result)
            } else {
                reject(error)
            }
        })
    })
}

const getAccountDetails = (accountId) => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT users.id, accounts.id AS account_id, accounts.account_number, accounts.balance, transactions.from_account_id, 
        transactions.to_account_id, transactions.amount FROM accounts INNER JOIN transactions ON accounts.id = transactions.from_account_id 
        INNER JOIN users ON accounts.id_user = users.id WHERE users.id = ? ORDER BY transactions.created_at ASC`
        connection.query(sql, accountId, (error, result) => {
            if (!error) {
                resolve(result)
            } else {
                reject(error)
            }
        })
    })
}

const updateAccount = (userId, accountData) => {
    return new Promise ((resolve, reject) => {
        let sql = `UPDATE accounts SET ? WHERE id_user = ?`
        connection.query(sql, [accountData, userId], (error, result) => {
            if (!error) {
                resolve(result)
            } else {
                reject(error)
            }
        })
    })
}

module.exports = {
    createAccount,
    countAccounts,
    getAccounts,
    updateAccount,
    getAccountDetails
}