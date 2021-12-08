const mongoose = require('mongoose')
const Login = require('../models/Login')
const bcrypt = require('bcryptjs')


module.exports = async () => {

    await mongoose.connect('mongodb://localhost:27017/anest',
        { useNewUrlParser: true, useUnifiedTopology: true })

        const admin = await Login.findOne()
        passwordHashed = await bcrypt.hash('123123', 12)

        if (!admin){

            const user = new Login({
                name: 'Shoxrux',
                surname: 'Buxorov',
                login: 'qwert',
                password: passwordHashed,
                role: 'super-admin'
            })

            await user.save()
        }
    

    const db = mongoose.connection
    db.on('open', () => console.log('mongodbga online ulandik'))
    db.on('error', (err) => console.log('qayerdadir xatolik bor', err))



}