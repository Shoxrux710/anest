const { Router } = require('express')
const News = require('../models/News')
const { newsValidator } = require('../utils/validator')
const { validationResult } = require('express-validator')
const {telegramValidator} = require('../utils/validator')
const isAuthMiddleware = require('../middleware/isAuth');
const attachUserMiddleware = require('../middleware/attachUser');
const checkRoleMiddleware = require('../middleware/checkRole');
const config = require('config')
const axios = require('axios')
const fs = require('fs')
const path = require('path')
const router = Router()


const deleteOldImage = (fileName) => {

    return new Promise((resolve, reject) => {
        fs.unlink(path.join(__dirname, `../client/${config.get('imgFolder')}/news/${fileName}`), err => {
            resolve()
        })
    })
}

// post

/**
 * @swagger
 * components:
 *   schemas:
 *     News: 
 *       type: object
 *       properties:
 *          titleUz: 
 *            type: string
 *          titleRu: 
 *            type: string  
 *          titleEn:
 *            type: string
 *          descriptionUz: 
 *            type: string
 *          descriptionRu:
 *            type: string
 *          descriptionEn:
 *            type: string 
 *          view: 
 *            type: number
 *            description: default 0 kiriting 
 *          imageNews:
 *            type: string
 *            format: binary 
 *       required:
 *         - titleUz
 *         - titleRu
 *         - titleEn
 *         - descriptionUz
 *         - descriptionRu
 *         - descriptionEn
 *         - view 
 */

/**
 * @swagger
 * /api/news/all:
 *  post:
 *    summary: yangilarni kiritish
 *    tags: [News]
 *    requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *              type: object
 *              $ref: "#/components/schemas/News"
 *    security:
 *       - bearerAuth: []
 *    responses:
 *       200:
 *         description: response 200   
 *       400:
 *         description: response 400
 *       500:
 *         description: response 500      
 *   
 * 
 */

router.post('/all', isAuthMiddleware, attachUserMiddleware, checkRoleMiddleware('admin'), newsValidator, (req, res) => {

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array(), errorMessage: `Iltimos to'ldiring` })
    }

    const {
        titleUz,
        titleRu,
        titleEn,
        descriptionUz,
        descriptionRu,
        descriptionEn
    } = req.body

    const { filename } = req.files.imageNews[0]

    const news = new News({
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
        imageNews: {
            fileName: filename,
            fileUrl: `./news/${filename}`
        }
    })

    news.save(err => {
        if (err) return res.status(400).json({ errorMessage: "Xato" })
        res.status(200).json({ successMessage: "Ok" })
    })
})

// get
/**
 * @swagger
 * /api/news/all:
 *  get:
 *    summary: hamma ma'lumotlarni chiqarib beradi
 *    tags: [News]
 *    parameters:
 *      - in: query
 *        name: pagination
 *        schema:
 *          type: object
 *        requried:
 *          - skip
 *          - limit
 *        properties:
 *          skip:
 *            type: number
 *          limit: 
 *            type: number
 *    responses:
 *        200:
 *          description: response 200   
 *        500:
 *          description: response 500          
 *        
 */

router.get('/all', async (req, res) => {

    try {

        const skip = req.query.skip ? Number(req.query.skip) : 0
        const limit = req.query.limit ? Number(req.query.limit) : 0

        const newsCount = await News.countDocuments()
        const news = await News.find().skip(skip).limit(limit)
        const newsFour = await News.find().sort({ _id: -1 }).skip(0).limit(4)

        res.status(200).json({
            newsCount,
            newsFour,
            news
        })

    } catch (err) {
        res.status(400).json({ errorMessage: "Xato" })
    }
})

/**
 * @swagger
 * /api/news/limit:
 *  get:
 *    summary: yangilarni limit bo'yicha chiqarib beradi
 *    tags: [News]
 *    parameters:
 *      - in: query
 *        name: limit
 *        schema:
 *           type: object
 *        required: 
 *           - skip
 *           - limit
 *        properties:
 *           skip:
 *             type: number
 *           limit: 
 *              type: number 
 *    responses: 
 *        200:
 *          description: response 200   
 *        500:
 *          description: response 500      
 * 
 */

router.get('/limit', async (req, res) => {

    try {
        const skip = req.query.skip ? Number(req.query.skip) : 0
        const limit = req.query.limit ? Number(req.query.limit) : 0     

        const newsCount = await News.countDocuments() - 3
        const newsOne = await News.find().skip(0).limit(1)
        const newsTwo = await News.find().skip(1).limit(2)
        const newsThree = await News.find().skip(skip).limit(limit)

        res.status(200).json({
            newsOne,
            newsTwo,
            newsThree,
            newsCount
        })

    } catch (err) {
        res.status(400).json({ errorMessage: "Xato" })
    }
})

// get/:id
/**
 * @swagger
 * /api/news/all/{id}:
 *   get:
 *    summary: har bir yangilikni chiqarib beradi
 *    tags: [News]
 *    parameters:
 *       - in: path
 *         name: id
 *         schema:
 *            type: string
 *         required: true 
 *    responses:
 *       200:
 *         description: resposne 200
 *       500: 
 *         description: response 500 
 * 
 */

router.get('/all/:id', (req, res) => {

    const { id } = req.params

    News.findById(id, (err, oneNews) => {
        if (err) res.status(400).json({ errorMessage: "Xato" })

        res.status(200).json({ oneNews })
    })
})

// random

/**
 * @swagger
 * /api/news/random:
 *   get:
 *     summary: hamma yangilarni chiqarib beradi
 *     tags: [News]
 *     responses:
 *       200:
 *         description: response 200
 *       500: 
 *         description: response 500
 * 
 */

router.get('/random', async (req, res) => {

    try {
        const userIndexs = []

        const getUniqueRandomNumber = (x) => {
            const index = Math.floor(Math.random() * (x))

            if (userIndexs.includes(index)) {
                return getUniqueRandomNumber(x)
            } else {
                userIndexs.push(index)
                return index
            }
        }


        const news = []
        const newsCount = await News.countDocuments()
        const randomLengthNews = newsCount < 4 ? newsCount : 4

        for (let i = 0; i < randomLengthNews; i++) {

            const randomValue = getUniqueRandomNumber(newsCount)
            const randomNews = await News.findOne().skip(randomValue)
            news.push(randomNews)

        }
        res.status(200).json({ news })

    } catch (err) {
        res.status(400).json({ errorMessage: "Xato" })
    }
})


// delete

/**
 * @swagger
 * /api/news/delete/{id}:
 *  delete:
 *    summary: yangilarni id bo'yicha o'chirish
 *    tags: [News]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema: 
 *          type: string
 *        required: true
 *    security:
 *      - bearerAuth: []
 *    responses:
 *       200:
 *         description: response 200
 *       500:
 *         description: response 500   
 */

router.delete('/delete/:id', isAuthMiddleware, attachUserMiddleware, checkRoleMiddleware('admin'), (req, res) => {

    const { id } = req.params

    News.findById(id, (err, oneNews) => {
        if (err) return res.status(400).json({ errorMessage: "Не удалось получить ноость по Id" })

        const { imageNews } = oneNews
        const oldFileName = imageNews.fileName

        News.deleteOne({ _id: id }, async (err) => {
            if (err) return res.status(400).json({ errorMessage: 'Xatto, ochirilmadi' });
            await deleteOldImage(oldFileName)
            res.status(200).json({ seccess: "Delete" })
        })
    })
})

// update

/**
 * @swagger
 * /api/news/update/{id}:
 *  put: 
 *    summary: yangilarni yangilash
 *    tags: [News]
 *    parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *    requestBody:
 *       content:
 *          multipart/form-data:
 *             schema:
 *                type: object
 *                $ref: "#/components/schemas/News"  
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      200:
 *        description: response 200
 *      500: 
 *        description: response 500  
 *     
 */

router.put('/update/:id', isAuthMiddleware, attachUserMiddleware, checkRoleMiddleware('admin'), (req, res) => {

    const { id } = req.params

    const {
        titleUz,
        titleRu,
        titleEn,
        descriptionUz,
        descriptionRu,
        descriptionEn
    } = req.body

    News.findById(id, (err, oneNews) => {
        if (err) return res.status(400).json({ errorMessage: "Xato" })

        const { imageNews } = oneNews
        const oldFileName = imageNews.fileName

        const fileName = req.files.imageNews ? req.files.imageNews[0].filename : oldFileName

        oneNews.title = {
            uz: titleUz,
            ru: titleRu,
            en: titleEn
        }

        oneNews.description = {
            uz: descriptionUz,
            ru: descriptionRu,
            en: descriptionEn
        }

        oneNews.imageNews = {
            fileName: fileName,
            fileUrl: `./news/${fileName}`
        }

        oneNews.save(async (err) => {
            if (err) return res.status(400).json({ errorMessage: "Xato" })
            req.files.imageNews ? await deleteOldImage(oldFileName) : null
            res.status(200).json({ successMessage: "Yangilandi" })
        })
    })
})


// view 
/**
 * @swagger
 * /api/news/view/{id}:
 *  put: 
 *   summary: yangiliklarni ko'rganlari sonini ko'rsatadi
 *   tags: [News]
 *   parameters: 
 *      - in: path
 *        name: id
 *        schema:
 *           type: string
 *        required: true  
 *   responses:
 *      200:
 *        description: response 200
 *      500:
 *        description: response 500 
 *   
 *           
 */

router.put('/view/:id', (req, res) => {
    
    const {id} = req.params

    News.findById(id, (err, oneNews) => {
        if (err) return res.status(400).json({errorMessage: "Xato"})
        
        const view = oneNews.view + 1

        oneNews.view = view

        oneNews.save(err => {
            if (err) return res.status(400).json({errorMessage: "Xato"})
            res.status(200).json({view})
        })
    })
})


// telegram

router.post('/telegram', telegramValidator, (req, res) => {
    
    const errors = validationResult(req)

    if (!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array(), errorMessage: `Iltimos to'ldiring` })
    }

    const {name, phone, description} = req.body

    token = "5013731861:AAHUGQeZmdi91atkEQaSgrKdl4dFkXb0kEU"
    id = "-755486287"

    const text = `Ism Familiya: ${name} \nTelefon nomer: ${phone} \n Text: ${description}`

    axios.get(`https://api.telegram.org/bot${token}/sendMessage?chat_id=${id}&text=${text}`)
          .then(response => {
              res.status(200).json({successMessage: 'Xabar yuborildi'})
          }).catch(err => {
            res.status(400).json({ errorMessage: 'Xato' })
          })  

})

module.exports = router