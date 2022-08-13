const multer = require('multer')
const config = require('config')


const storage = multer.diskStorage({

    destination(req, file, cb){
        console.log("file",file)
        if (file.fieldname === 'imageNews'){
            cb(null, `./client/${config.get('imgFolder')}/news`)
        }
        if (file.fieldname === 'imageDrug'){
            cb(null, `./client/${config.get('imgFolder')}/drug`)
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