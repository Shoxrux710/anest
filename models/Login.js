const mongoose = require('mongoose')

const loginSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    login: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 4
    },
    role: {
        type: String,
        default: 'admin'
    },
    avatar: {
        fileName: {
            type: String,
            default: null
        },
        fileUrl: {
            type: String,
            default: null
        }
    }
})

module.exports = mongoose.model('Login', loginSchema)