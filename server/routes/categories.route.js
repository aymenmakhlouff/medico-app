const route = require('express').Router()
const {getAll, getOne, create, update, deleteOne} = require("../controller/categories.controller")

route.get("/getAll", getAll)
route.get("/getOne/:id", getOne)
route.post("/createCategorie", create)
route.put("/updateCategorie/:id", update)
route.delete("/deleteCategorie/:id", deleteOne)

module.exports = route