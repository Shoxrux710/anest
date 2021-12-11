const {Router} = require('express')
const Login = require('../models/Login')
const {registerValidator} = require('../utils/validator')
const {authValidator} = require('../utils/validator')
const {validationResult} = require('express-validator')
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const router = Router()


// register

router.post('/register', registerValidator, async (req, res) => {

   try {
    
    const errors = validationResult(req)

    if (!errors.isEmpty()){
        return res.status(400).json({errors: errors.array(), errorMessage: `Iltimos to'ldiring`})
    }

    const {
        name,
        surname,
        login,
        password
    } = req.body

    const user = await Login.findOne({login})

    if (user){
       res.status(400).json({errorMessage: "User already"})
    }

    const passwordHashed = await bcrypt.hash(password, 12)

    const promise = new Login({
        name,
        surname,
        login,
        password: passwordHashed
    })

    await promise.save(err => {
        if (err) return res.status(400).json({errorMessage: "Xato"})
        res.status(200).json({successMessage: "Register success"})
    })


   } catch (err) {
       console.log(err);
   }


})

// register/:id

router.get('/:id', (req, res) => {

    const {id} = req.params

    Login.findById(id, (err, user) => {
        if (err) return res.status(400).json({msg: "Xato"})

        res.status(200).json({user})
    })
})

// login

router.post('/login', authValidator, async (req, res) => {

    try {
        
        const errors = validationResult(req)

        if (!errors.isEmpty()){
            return res.status(400).json({errors: errors.array(), errorMessage: `Iltimos to'ldiring`})
        }

        const {login, password} = req.body

        const user = await Login.findOne({login})

        if (!user){
            return res.status(400).json({errorMessage: "Please login..."})
        }

        const match = await bcrypt.compare(password, user.password)

        if (!match){
            return res.status(400).json({errorMessage: "inCorrect password"})
        }

        const paylaod = {
            id: user._id
        }

        const token = jwt.sign(paylaod, config.get('jwtSecretKey'))

        res.status(200).json({
            token,
            user: {
                id: user._id,
                role: user.role
            },
            msg:  "User Loggedin Succesfully"
        })

    } catch (err) {
        console.log(err);
    }
})

module.exports = router