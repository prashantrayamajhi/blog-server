const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req,file,cb) {
        cb(null, 'images/')
    },
    filename: function (req,file,cb) {
        console.log(file.originalname)
        cb(null, Date.now()+ '-' + file.originalname )
    }
})

const upload = multer({storage})

module.exports = upload