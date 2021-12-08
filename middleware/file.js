const multer = require('multer')

const storage = multer.diskStorage({

    destination(req, file, cb){
        if (file.fieldname === 'imageNews'){
            cb(null, './client/public/news')
        }
        if (file.fieldname === 'imageDrug'){
            cb(null, './client/public/drug')
        }
    },

    filename(req, file, cb){
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})

const allowedTypes = ['image/png', 'image/jpg', 'image/jpeg']

const fileFilter = (req, file, cb) => {

    if (allowedTypes.includes(file.mimetype)){
        cb(null, true)
    }else{
        cb(null, false)
    }
}

module.exports = multer({ storage, fileFilter })