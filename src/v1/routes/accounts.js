const express = require('express');
const route = express.Router()
const accountsController = require('../controllers/accounts.js')

route.get('/', accountsController.getAccounts)
route.get('/details/:id', accountsController.getAccountDetails)
route.put('/update/:id', accountsController.updateAccount)

module.exports = route