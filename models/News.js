const mongoose = require('mongoose')

const newsSchema = new mongoose.Schema({
    title: {
        ru: String,
        uz: String,
        en: String,
    },
    description: {
        ru: String,
        uz: String,
        en: String, 
    },
    imageNews: {
        fileName: String,
        fileUrl: String
    },
    date: {
        type: Date,
        default: Date.now
    },
    view: {
        type: Number,
        default: 0 
    }
})

module.exports = mongoose.model('New', newsSchema)