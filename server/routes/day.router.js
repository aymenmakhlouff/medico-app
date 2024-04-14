const route = require('express').Router()
const {dayAvailability,deleteDay} = require("../controller/day.controller")

route.post("/:doctorId", dayAvailability)
route.delete("/delete/:IdDay", deleteDay)


module.exports = route