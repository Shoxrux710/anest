const {Router} = require('express')
const {validationResult} = require('express-validator')
const {drugValidator} = require('../utils/validator')
const isAuthMiddleware = require('../middleware/isAuth');
const attachUserMiddleware = require('../middleware/attachUser');
const checkRoleMiddleware = require('../middleware/checkRole');
const fs = require('fs')
const config = require('config')
const path = require('path')
const Drug = require('../models/Drug')
const router = Router()


const deleteOldImage = (fileName) => {

    return new Promise((resolve, reject) => {
        fs.unlink(path.join(__dirname, `../client/${config.get('imgFolder')}/drug/${fileName}`), err => {
            resolve()
        })
    })

}


// post

/**
 * @swagger
 * components:
 *  securitySchemes:
 *      bearerAuth:
 *          type: http
 *          scheme: bearer
 *          bearerFormat: JWT
 *  security:
 *      - bearerAuth: []
 *  schemas:
 *      Drug:
 *        type: object
 *        properties:
 *            titleUz: 
 *              type: string
 *              description: titleuz
 *            titleRu: 
 *              type: string  
 *              description: titleru 
 *            titleEn:
 *              type: string
 *              description: titleen 
 *            descriptionUz: 
 *              type: string
 *              description: descriptionuz
 *            descriptionRu:
 *              type: string
 *              description: descriptionru
 *            descriptionEn:
 *              type: string 
 *              description: descriptionen
 *            usedUz:
 *              type: string
 *              description: useduz
 *            usedRu: 
 *              type: string
 *              description: usedru
 *            usedEn:
 *              type: string
 *              description: useden
 *            structureUz:
 *              type: string
 *              description: structureuz
 *            structureRu:
 *              type: string
 *              description: structureru
 *            structureEn:
 *              type: string   
 *              description: structureen
 *            imageDrug:
 *              type: string
 *              format: binary
 *        required:
 *            - titleUz
 *            - titleRu
 *            - titleEn
 *            - descriptionUz
 *            - descriptionRu
 *            - descriptionEn
 *            - usedUz
 *            - usedRu
 *            - usedEn
 *            - structureUz
 *            - structureRu
 *            - structureEn 
 *        example:
 *              titleUz: titleuz
 *              titleRu: titleru
 *              titleEn: titleen 
 *              descriptionUz: descriptionuz
 *              descriptionRu: descriptionru
 *              descriptionEn: descriptionen 
 *              usedUz: useduz
 *              usedRu: usedru
 *              usedEn: useden
 *              structureUz: structureuz
 *              structureRu: structureru 
 *              structureEn: structureen
 * 
 */

/**
 * @swagger
 * /api/drug/all:
 *  post:
 *    summary: dorilarni kiritish
 *    tags: [Drug]
 *    requestBody:
 *      required: true
 *      content:
 *          multipart/form-data:
 *             schema:
 *                type: object
 *                $ref: "#/components/schemas/Drug"
 *    security:
 *      - bearerAuth: []
 *                  
 *    responses: 
 * 
 *      200:
 *         description: response 200
 *      400: 
 *         description: response 400
 *      500:
 *         description: response 500
 *  
 */

router.post('/all', isAuthMiddleware, attachUserMiddleware, checkRoleMiddleware('admin'), drugValidator, (req, res) => {

    const errors = validationResult(req)
    console.log(req.body)
    console.log(req.files)
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

/**
 * @swagger
 * /api/drug/all:
 *  get:
 *   summary: get all
 *   tags: [Drug]
 *   parameters:
 *      - in: query
 *        name: pagination
 *        schema: 
 *          type: object
 *        requried: 
 *          - skip
 *          - limit
 *        properties:
 *           skip:
 *             type: number
 *           limit:
 *             type: number  
 * 
 *   responses: 
 *      200:
 *        description: response 200   
 *      500:
 *        description: response 500    
 */
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

/**
 * @swagger
 * /api/drug/all/{id}:
 *   get:
 *    summary: har bir dori ma'lumotlarini chiqarib beradi
 *    tags: [Drug]
 *    parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *    responses: 
 *         200: 
 *           description: response 200
 *         500:
 *           description: response 500
 *         
 * 
 */

router.get('/all/:id', (req, res) => {
    
    const {id} = req.params

    Drug.findById(id, (err, oneDrug) => {
       if (err) res.status(400).json({errorMessage: "Xato"})

        res.status(200).json({oneDrug})
    })
})

// random

/**
 * @swagger
 * /api/drug/random:
 *  get:
 *    summary: dorilarni random chiqarish
 *    tags: [Drug]
 * 
 *    responses: 
 *         200: 
 *           description: response 200
 *         500:
 *           description: response 500
 *    
 */

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

/**
 * @swagger
 * /api/drug/delete/{id}:
 *  delete:
 *    summary: dorini o'chirish
 *    tags: [Drug]
 *    parameters:
 *      - in: path 
 *        name: id
 *        schema:
 *          type: string
 *        required: true 
 *    security:
 *      - bearerAuth: []
 *   
 *    responses: 
 *       200:
 *         description: response 200 
 *       500:
 *         description: response 400   
 *       
 */

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
/**
 * @swagger
 * /api/drug/update/{id}:
 *  put:
 *    summary: dorilarni yangilash
 *    tags: [Drug]
 *    parameters:
 *       - in: path
 *         name: id
 *         schema:
 *            type: string
 *         required: true
 *    requestBody:  
 *      content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             $ref: "#/components/schemas/Drug"
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      200:
 *        description: reponse 200       
 *      500: 
 *        description: reponse 500 
 * 
 */

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