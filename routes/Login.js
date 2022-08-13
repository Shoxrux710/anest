const { Router } = require('express')
const Login = require('../models/Login')
const { registerValidator } = require('../utils/validator')
const { authValidator } = require('../utils/validator')
const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const router = Router()


// register

/**
 * @swagger
 * components:
 *  schemas:
 *      Login:
 *          type: object
 *          properties:
 *             name: 
 *               type: string
 *             surname: 
 *               type: string
 *             login: 
 *               type: string
 *             password: 
 *               type: string
 *             confirm:
 *               type: string
 *          required: 
 *              - name
 *              - surname
 *              - login
 *              - password
 *              - confirm
 *          example: 
 *              name: shoxrux
 *              surname: buxorov
 *              login: shox456
 *              password: "123456"
 *              confirm: "123456" 
 */

/**
 * @swagger
 * /api/user/register:
 *  post:
 *    summary: ro'yxatdan o'tish
 *    tags: [Login]
 *    requestBody: 
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *                type: object
 *                $ref: "#/components/schemas/Login"
 *      
 *    responses: 
 *      200: 
 *          description: response 200
 *      400: 
 *          description: response 400
 *      500: 
 *          description: response 500
 */
router.post('/register', registerValidator, async (req, res) => {

    console.log(req.body)

    try {

        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array(), errorMessage: `Iltimos to'ldiring` })
        }

        const {name, surname, login, password} = req.body

        const user = await Login.findOne({ login })

        if (user) {
           return res.status(400).json({ errorMessage: "User already" })
        }

        const passwordHashed = await bcrypt.hash(password, 12)

        const newLogin = new Login({
            name,
            surname,
            login,
            password: passwordHashed
        })

        await newLogin.save(err => {
            if (err) return res.status(400).json({ errorMessage: "Xato" })
            res.status(200).json({ successMessage: "Register success" })
        })


    } catch (err) {
        console.log(err);
    }


})

// register/:id
/**
 * @swagger
 * /api/user/{id}:
 *  get:
 *   summary: login id
 *   tags: [Login]
 *   parameters:
 *     - in: path
 *       name: id
 *       schema:
 *         type: string
 *       required: true
 *   
 * 
 *   responses: 
 *       200: 
 *        description: response 200
 *       500:
 *        description: response 500
 *      
 */

router.get('/:id', (req, res) => {

    const { id } = req.params

    Login.findById(id, (err, user) => {
        if (err) return res.status(400).json({ msg: "Xato" })

        res.status(200).json({ user })
    })
})

// login

/**
 * @swagger
 * /api/user/login:
 *  post:
 *      summary: login
 *      tags: [Login]
 *      requestBody:
 *        required: true
 *        content:                                                                                                                                          
 *           multipart/form-data:
 *                schema:
 *                   properties:
 *                       login:
 *                         type: string
 *                       password: 
 *                         type: string
 *                   required:
 *                       - login
 *                       - password   
 *                   example:
 *                       login: login
 *                       password: "123456" 
 *      responses:
 *        200:
 *          description: response 200
 *        400:
 *          description: response 400
 *        500:
 *          description: response 500  
 *     
 * 
 */

router.post('/login', authValidator, async (req, res) => {

    try {

        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array(), errorMessage: `Iltimos to'ldiring` })
        }

        const { login, password } = req.body

        const user = await Login.findOne({ login })

        if (!user) {
            return res.status(400).json({ errorMessage: "Please login..." })
        }

        const match = await bcrypt.compare(password, user.password)

        if (!match) {
            return res.status(400).json({ errorMessage: "inCorrect password" })
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
            msg: "User Loggedin Succesfully"
        })

    } catch (err) {
        console.log(err);
    }
})

module.exports = router