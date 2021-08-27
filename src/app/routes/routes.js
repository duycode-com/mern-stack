const express = require('express')
const router = express.Router()
const path = require('path');

const apiRouter = require('./apiRouter.js')
const authRouter = require('./authRouter.js')

router.use('/api', apiRouter)
router.use('/auth', authRouter)

router.get('/', (req, res, next) => {
    res.json({data:"This is Supper Project"});
})

module.exports = router
