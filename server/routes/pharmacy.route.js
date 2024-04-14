const route = require('express').Router()

const {getAll,create,update,deleteOne, migratePharmacy,getAivablePharma,updataLongLat,updateLocation, recordsDoc,getAivablePharmaDayNight,getAivablePharmaMapped,getAivablePharmaDayNightMapped,verficationPharm,fetchAll,getOne,findOneProfile,updateImgPharma,getOneProfile} = require('../controller/pharmacyController')


route.get('/getAll',getAll)
route.get('/getAllDN/:isBlockPharma/:isVerefPharma/:typeDN',getAivablePharmaDayNight)
route.get('/getAllDNMapped/:isBlockPharmaMapped/:isVerefPharmaMapped/:typeDNMapped',getAivablePharmaDayNightMapped)
route.post('/createPhar',create)
route.put('/updatePharmacy/:id',update)
route.delete('/deletePharmacy/:id',deleteOne)
route.post("/migratePharm" , migratePharmacy)
route.get("/pharmaLocation/:blockPharma/:verefPharma" , getAivablePharma)
route.get("/pharmaLocationMapped/:blockPharmaMapped/:verefPharmaMapped" , getAivablePharmaMapped)
route.patch("/updateLangLat/:id" , updataLongLat)
route.patch("/updateLocation" , updateLocation)
route.post("/updatRecords" , recordsDoc)
route.patch("/verficationPharm" , verficationPharm)
route.get("/fetch" , fetchAll)
route.get("/getOnePharm/:email" , getOne)
route.get("/getOnePharmId/:PharmaProfileId" , findOneProfile)
route.put("/updateImgPharmacy/:emailImgUpdatePharma",updateImgPharma)
route.get("/getPharmaOne/:emailProfile",getOneProfile)

module.exports=route