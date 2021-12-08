const mongoose = require('mongoose')

const drugSchema = new mongoose.Schema({
    title: {
        ru: String,
        uz: String,
        en: String
    },
    description: {
        ru: String,
        uz: String,
        en: String 
    },
    used: {
        ru: String,
        uz: String,
        en: String
    },
    structure: {
        ru: String,
        uz: String,
        en: String
    },
    imageDrug: {
        fileName: String,
        fileUrl: String
    }
})

module.exports = mongoose.model('Drug', drugSchema)