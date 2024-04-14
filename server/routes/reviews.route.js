const route = require('express').Router()
const {getAllForDoctor,createReview,update,deleteOne, getAllForPharmacy, createReviewForDoctor, createReviewForPharmacy,getAllForPharmacyProfile} = require('../controller/review.controller')


route.get('/getAll/:doctorId',getAllForDoctor)
route.get('/getAllPh/:pharmacyId',getAllForPharmacy)
route.post('/createRev',createReviewForDoctor)
route.post('/createRevPh',createReviewForPharmacy)
route.delete('/deleteRev/:id',deleteOne)
route.get("/pharmaProfile/:idPharma",getAllForPharmacyProfile)


module.exports=route