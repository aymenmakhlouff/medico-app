const route = require('express').Router()
const {getAll, create, update, deleteOne} = require("../controller/specialities.js")

route.get("/getAll", getAll)
route.post("/createSpecialities", create)
route.put("/updateSpecialities/:id", update)
route.delete("/deleteSpecialities/:id", deleteOne)

module.exports = route