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

router.get('/all/:id', (req, res) => {

    const { id } = req.params

    News.findById(id, (err, oneNews) => {
        if (err) res.status(400).json({ errorMessage: "Xato" })

        res.status(200).json({ oneNews })
    })
})

// random

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