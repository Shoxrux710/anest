const express = require('express');
const cors = require('cors');
const middleware = require('./middleware/file');
const app = express();

// routes
const newRouter = require('./routes/News')
const drugRouter = require('./routes/Drug')
const loginRouter = require('./routes/Login')

app.use(express.json({ extended: true }))
app.use(cors())
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



const PORT = 4006

app.listen(PORT, () => console.log(`server ${PORT} da ishladi`))