const mongoose = require('mongoose')
const Login = require('../models/Login')
const bcrypt = require('bcryptjs')
const config = require('config')


module.exports = async () => {

    await mongoose.connect(config.get('mongoUri'),
        { useNewUrlParser: true, useUnifiedTopology: true })

        const admin = await Login.findOne()
        passwordHashed = await bcrypt.hash('qwert123', 12)

        if (!admin){

            const user = new Login({
                name: 'anest',
                surname: 'anestuz',
                login: 'anest444',
                password: passwordHashed,
                role: 'super-admin'
            })

            await user.save()
        }
    

    const db = mongoose.connection
    db.on('open', () => console.log('mongodbga online ulandik'))
    db.on('error', (err) => console.log('qayerdadir xatolik bor', err))



}