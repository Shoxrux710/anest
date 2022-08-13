const express = require('express');
const cors = require('cors');
const middleware = require('./middleware/file');
const path = require('path');
const config = require('config')
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
const app = express();

// routes
const newRouter = require('./routes/News')
const drugRouter = require('./routes/Drug')
const loginRouter = require('./routes/Login')

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: "Anest API",
            description: "Anest information API",
            contact: {
                name: "Buxorov Shoxrux"
            },
            servers: ["http://localhost:4006"]
        }
    },
    apis: ['./routes/*.js']
}


const swaggerDocs = swaggerJsDoc(swaggerOptions)



app.use(express.json({ extended: true }))
app.use(cors())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
app.use(middleware.fields([
    {name: 'imageNews', maxCount: 1},
    {name: 'imageDrug', maxCount: 1}

]))

// mongoDB
const db = require('./utils/db')
db()



app.use('/api/news', newRouter)
app.use('/api/drug', drugRouter)
app.use('/api/user', loginRouter)



// listen
const PORT = config.get('port')

if (process.env.NODE_ENV === 'production'){
    app.use('/', express.static(path.join(__dirname, 'client', 'build')))
    app.use('/', express.static(path.join(__dirname, 'admin', 'build')))

    app.get('/admin*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'admin', 'build', 'index.html'))
    })

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}



app.listen(PORT, () => console.log(`server ${PORT} da ishladi`))