const {body} = require('express-validator')

exports.newsValidator = [
    body('titleUz').isLength({min: 1}),
    body('titleRu').isLength({min: 1}),
    body('titleEn').isLength({min: 1}),
    body('descriptionUz').isLength({min: 1}),
    body('descriptionRu').isLength({min: 1}),
    body('descriptionEn').isLength({min: 1})
]

exports.drugValidator = [
    body('titleUz').isLength({min: 1}),
    body('titleRu').isLength({min: 1}),
    body('titleEn').isLength({min: 1}),
    body('descriptionUz').isLength({min: 1}),
    body('descriptionRu').isLength({min: 1}),
    body('descriptionEn').isLength({min: 1}),
    body('usedUz').isLength({min: 1}),
    body('usedRu').isLength({min: 1}),
    body('usedEn').isLength({min: 1}),
    body('structureUz').isLength({min: 1}),
    body('structureRu').isLength({min: 1}),
    body('structureEn').isLength({min: 1})
]

exports.registerValidator = [
    body('name').isLength({min: 1}),
    body('surname').isLength({min: 1}),
    body('login').isLength({min: 1}),
    body('password').isLength({min: 1}),
    body('confirm').custom((value, {req}) => {

        if(value !== req.body.password){
            throw new Error(`Parollar bir xil bo'lishi kerak!`)
        }
        return true
    })
]

exports.authValidator = [
    body('login').isLength({min: 1}),
    body('password').isLength({min: 1})
]

exports.telegramValidator = [
    body('name').isLength({min: 1}),
    body('phone').isLength({min: 1}),
    body('description').isLength({min: 1})
]