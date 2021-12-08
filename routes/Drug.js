const {Router} = require('express')
const {validationResult} = require('express-validator')
const {drugValidator} = require('../utils/validator')
const isAuthMiddleware = require('../middleware/isAuth');
const attachUserMiddleware = require('../middleware/attachUser');
const checkRoleMiddleware = require('../middleware/checkRole');
const fs = require('fs')
const path = require('path')
const Drug = require('../models/Drug')
const router = Router()


const deleteOldImage = (fileName) => {

    return new Promise((resolve, reject) => {
        fs.unlink(path.join(__dirname, `../client/public/drug/${fileName}`), err => {
            resolve()
        })
    })

}


// post

router.post('/all', isAuthMiddleware, attachUserMiddleware, checkRoleMiddleware('admin'), drugValidator, (req, res) => {

    const errors = validationResult(req)

    if (!errors.isEmpty()){
        return res.status(400).json({errors: errors.array(), errorMessage: `Iltimos to'ldiring`})
    }

    const {
        titleUz,
        titleRu,
        titleEn,
        descriptionUz,
        descriptionRu,
        descriptionEn,
        usedUz,
        usedRu,
        usedEn,
        structureUz,
        structureRu,
        structureEn
    } = req.body

    const {filename} = req.files.imageDrug[0]

    const drug = new Drug({
        title: {
            uz: titleUz,
            ru: titleRu,
            en: titleEn
        },
        description: {
            uz: descriptionUz,
            ru: descriptionRu,
            en: descriptionEn
        },
        used: {
            uz: usedUz,
            ru: usedRu,
            en: usedEn
        },
        structure: {
            uz: structureUz,
            ru: structureRu,
            en: structureEn
        },
        imageDrug: {
            fileName: filename,
            fileUrl: `./drug/${filename}`
        }
    })


    drug.save(err => {
        if (err) return res.status(400).json({errors: errors.array(), errorMessage: `Xato`})
        res.status(200).json({successMessage: "Ok"})
    })
})

// get

router.get('/all', async(req, res) => {

    try {
        
        const skip = req.query.skip ? Number(req.query.skip) : 0
        const limit = req.query.limit ? Number(req.query.limit) : 0

        const drugCount = await Drug.countDocuments()
        const drug = await Drug.find().skip(skip).limit(limit)
        const sortDrug = await Drug.find().sort({_id: -1}).skip(0).limit(4)

        res.status(200).json({
            drugCount,
            sortDrug,
            drug
        })

    } catch (err) {
        res.status(200).json({errorMessage: "Xato"})
    }
})

// get/:id

router.get('/all/:id', (req, res) => {
    
    const {id} = req.params

    Drug.findById(id, (err, oneDrug) => {
       if (err) res.status(400).json({errorMessage: "Xato"})

        res.status(200).json({oneDrug})
    })
})

// random

router.get('/random', async (req, res) => {
  
    try {
        const userIndexs = []

        const getUniqueRandomNumber = (x) => {
            const index = Math.floor(Math.random() * (x))

            if (userIndexs.includes(index)){
                return getUniqueRandomNumber(x)
            } else {
                userIndexs.push(index)
                return index
            }
        }


        const drugs = []
        const drugsCount = await Drug.countDocuments()
        const randomLengthNews = drugsCount < 4 ? drugsCount : 4

        for (let i = 0; i < randomLengthNews; i++) {
            
            const randomValue = getUniqueRandomNumber(drugsCount)
            const randomDrugs = await Drug.findOne().skip(randomValue)
            drugs.push(randomDrugs)
            
        }
        res.status(200).json({drugs})
        
    } catch (err) {
        res.status(400).json({errorMessage: "Xato"})
    }
})

// delete

router.delete('/delete/:id', isAuthMiddleware, attachUserMiddleware, checkRoleMiddleware('admin'), (req, res) => {

    const {id} = req.params

    Drug.findById(id, (err, oneDrug) => {
        if (err) res.status(400).json({errorMessage: "Xato"})

        const {imageDrug} = oneDrug
        const oldFileName = imageDrug.fileName

        Drug.deleteOne({_id: id}, async (err) =>{
            if (err) res.status(400).json({errorMessage: "Xato"})
            await deleteOldImage(oldFileName)
            res.status(200).json({seccess: "Delete"})
        })
    })


})


// update

router.put('/update/:id', isAuthMiddleware, attachUserMiddleware, checkRoleMiddleware('admin'), (req, res) => {

    const {id} = req.params

    const {
        titleUz,
        titleRu,
        titleEn,
        descriptionUz,
        descriptionRu,
        descriptionEn,
        usedUz,
        usedRu,
        usedEn,
        structureUz,
        structureRu,
        structureEn
    } = req.body

    Drug.findById(id, (err, oneDrug) => {
        if (err) return res.status(400).json({ errorMessage: "Xato"})

        const {imageDrug} = oneDrug
        const oldFileName = imageDrug.fileName

        const filename = req.files.imageDrug ? req.files.imageDrug[0].filename : oldFileName

        oneDrug.title = {
            uz: titleUz,
            ru: titleRu,
            en: titleEn
        }

        oneDrug.description = {
            uz: descriptionUz,
            ru: descriptionRu,
            en: descriptionEn
        }

        oneDrug.used = {
            uz: usedUz,
            ru: usedRu,
            en: usedEn
        } 

        oneDrug.structure = {
            uz: structureUz,
            ru: structureRu,
            en: structureEn
        }

        oneDrug.imageDrug = {
            fileName: filename,
            fileUrl: `./drug/${filename}`
        }

        oneDrug.save(async (err) => {
            if (err) return res.status(400).json({ errorMessage: "Xato"})
            req.files.imageDrug ? await deleteOldImage(oldFileName) : null
            res.status(200).json({successMessage: "Yangilandi"})
        })
    })
})


module.exports = router