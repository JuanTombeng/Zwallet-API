const connection = require('../config/dbConfig')

// Contact Group section
// add new contact group
const addContactGroup = (data) => {
    return new Promise ((resolve, reject) => {
        const sql = `INSERT INTO contact_groups SET ?`
        connection.query(sql, data, (error, result) => {
            if (!error) {
                resolve(result)
            } else {
                reject(error)
            }
        })
    })
}

// check if contact grup is existed
const findContactGroup = (userId) => {
    return new Promise ((resolve, reject) => {
        const sql = `SELECT id, total_member FROM contact_groups WHERE user_holder_id = ?`
        connection.query(sql, userId, (error, result) => {
            if (!error) {
                resolve(result)
            } else {
                reject(error)
            }
        })
    })
}

// update contact group total member
const updateContactGroupTotal = (totalMember, groupId) => {
    return new Promise ((resolve, reject) => {
        const sql = `UPDATE contact_groups SET total_member = ? WHERE id = ?`
        connection.query(sql, [totalMember, groupId], (error, result) => {
            if (!error) {
                resolve(result)
            } else {
                reject(error)
            }
        })
    })
}

// get list of member from contact group
const getContactGroup = ({id, search, sort, order, limit, offset}) => {
    return new Promise ((resolve, reject) => {
        let sql = `SELECT contact_members.id_user, contact_groups.id, contact_groups.user_holder_id, 
        contact_groups.total_member, users. id, users.first_name, users.last_name, users.phone_number, users.profile_picture 
        FROM contact_members INNER JOIN contact_groups ON contact_members.contact_groups_id = contact_groups.id 
        INNER JOIN users ON contact_members.id_user = users.id `
        if (search) {
            // sql += `WHERE contact_groups.user_holder_id = ${id} AND users.first_name LIKE '%${search}%' 
            // ORDER BY users.${order} ${sort} LIMIT ${limit} OFFSET ${offset}`
            sql += `WHERE contact_groups.user_holder_id = ${id} AND users.first_name LIKE '%${search}%' 
            ORDER BY users.${order} ${sort}`
        } else {
            // sql += `WHERE contact_groups.user_holder_id = '${id}' ORDER BY users.${order} ${sort} LIMIT ${limit} OFFSET ${offset}`
            sql += `WHERE contact_groups.user_holder_id = '${id}' ORDER BY users.${order} ${sort}`
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

const getContactGroupIdAndTotal = (user_holder_id) => {
    return new Promise ((resolve, reject) => {
        const sql = `SELECT id, total_member FROM contact_groups WHERE user_holder_id = ?`
        connection.query(sql, user_holder_id, (error, result) => {
            if (!error) {
                resolve(result)
            } else {
                reject(error)
            }
        })
    })
}


// Contact Member section
// add new member to contact group
const addContactMember = (data) => {
    return new Promise ((resolve, reject) => {
        const sql = `INSERT INTO contact_members SET ?`
        connection.query(sql, data, (error, result) => {
            if (!error) {
                resolve(result)
            } else {
                reject(error)
            }
        })
    })
}

//check if member existed in contact group
const getContactMemberExisted = (id_user, id_contact_group) => {
    return new Promise ((resolve, reject) => {
        const sql = `SELECT id FROM contact_members WHERE id_user = ? AND contact_groups_id = ?`
        connection.query(sql, [id_user, id_contact_group], (error, result) => {
            if (!error) {
                resolve(result)
            } else {
                reject(error)
            }
        })
    })
}

// contact member detail after member added
const getContactMemberDetail = (userTargetId, userHolderId) => {
    return new Promise ((resolve, reject) => {
        const sql = `SELECT users.first_name, users.last_name, users.phone_number, users.profile_picture, users.active, 
        contact_groups.id FROM users INNER JOIN contact_groups WHERE users.id = ? AND contact_groups.user_holder_id = ?`
        connection.query(sql, [userTargetId, userHolderId], (error, result) => {
            if (!error) {
                resolve(result)
            } else {
                reject(error)
            }
        })
    })
}

// delete member from contact group
const deleteContactMember = (contact_groups_id, id_user) => {
    return new Promise ((resolve, reject) => {
        const sql = `DELETE FROM contact_members WHERE contact_groups_id = ? AND id_user = ?`
        connection.query(sql, [contact_groups_id, id_user], (error, result) => {
            if (!error) {
                resolve(result)
            } else {
                reject(error)
            }
        })
    })
}

// const getCountContactGroup = (userHolderId) => {
//     return new Promise ((resolve, reject) => {
//         const sql = `SELECT total_member FROM contact_groups WHERE user_holder_id = ?`
//         connection.query(sql, userHolderId, (error, result) => {
//             if (!error) {
//                 resolve(result)
//             } else {
//                 reject(error)
//             }
//         })
//     })
// }

// const updateContactGroupTotalMember = (contact_groups_id, total_member) => {
//     return new Promise ((resolve, reject) => {
//         const sql = `UPDATE contact_groups SET total_member = ? WHERE id = ?`
//         connection.query(sql, [total_member, contact_groups_id], (error, result) => {
//             if (!error) {
//                 resolve(result)
//             } else {
//                 reject(error)
//             }
//         })
//     })
// }



module.exports = {
    addContactGroup,
    findContactGroup,
    updateContactGroupTotal,
    getContactGroup,
    getContactGroupIdAndTotal,
    addContactMember,
    getContactMemberExisted,
    getContactMemberDetail,
    deleteContactMember,
    // getCountContactGroup,
    // updateContactGroupTotalMember,
}