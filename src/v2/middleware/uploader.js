const multer = require('multer')

const storage = multer.diskStorage({
    destination : (req, file, cb) => {
        cb(null, './src/uploads')
    },
    filename : (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + '-' + file.originalname);
    }
})

const upload = multer({storage : storage})
module.exports = {upload}