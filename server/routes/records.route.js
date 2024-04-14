const route = require('express').Router()

const { getAll, createDocs } = require('../controller/records.controller')



route.get('/getAll' , getAll)
route.post('/createDocs' , createDocs)




module.exports = route