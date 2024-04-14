const route = require('express').Router()

const{getbill,sendE}=require("../controller/nodemailer.controller")

route.post("/send",getbill)
route.post("/sendEmail",sendE)
module.exports = route