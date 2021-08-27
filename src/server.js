require('dotenv').config()
const uri = process.env.MONGODB_URI || process.env.MONGO_LOCALHOST
const port = process.env.PORT || 3000

const express = require('express')
const app = express()

// const mongoose = require('./database/mongoose.js')
// mongoose.connect(uri)
const mongoDB = require('./database/mongoDB.js')
mongoDB.connect(uri, process.env.MONGODB_DB_NAME)

//-- REST Middleware--
// Convert request.body from json to object
app.use(express.json())
//Allow access from localhost
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE')
    res.header('Access-Control-Allow-Headers', 'Content-Type')
    next()
})
const path = require('path')
app.use(express.static(path.join(__dirname, '../public')))

const router = require('./app/routes/routes.js')
app.use('/', router)

app.listen(port, () => {
    console.log('Server listening at: ' + '\x1b[34m' + 'http://localhost:' + port + '\x1b[0m')
    console.log('Database listening at: ' + '\x1b[34m' + uri + '\x1b[0m')
})
