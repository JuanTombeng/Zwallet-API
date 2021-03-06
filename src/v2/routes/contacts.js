const express = require('express')
const route = express.Router()
const contactController = require('../controller/contacts')
const authenticator = require('../middleware/authentication')

// const {hitCacheUserListByList, clearRedisUser, clearRedisContactList, clearRedisContactMemberDetail} = require('../middleware/redis')

// route.post('/add-contact-list', authenticator.userTokenVerification, clearRedisUser, clearRedisContactList, clearRedisContactMemberDetail, contactController.addContactList)
// route.get('/contact-list', authenticator.userTokenVerification, hitCacheUserListByList, contactController.getContactList)
// route.get('/contact-list/member/:id', authenticator.userTokenVerification, contactController.getContactMemberDetail)
// route.delete('/delete-contact-member', authenticator.userTokenVerification, clearRedisContactList, clearRedisContactMemberDetail, contactController.deleteContactMember)

route.post('/add-contact-list', authenticator.userTokenVerification, contactController.addContactList)
route.get('/contact-list', authenticator.userTokenVerification, contactController.getContactList)
route.get('/contact-list/member/:id', authenticator.userTokenVerification, contactController.getContactMemberDetail)
route.delete('/delete-contact-member', authenticator.userTokenVerification, contactController.deleteContactMember)

module.exports = route