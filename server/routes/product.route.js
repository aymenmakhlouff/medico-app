const route = require('express').Router()
const {getAll, getOne, findOneMissing,pharmacyProduct, controlMissing,create, update, deleteOne, updateQ,getProductByCodebar,searchByName,searchNameLike,searchByBarcodeNoDup,searchAllByBarcodeNoDup,pharmacyProductWithId} = require("../controller/products.controller")

route.get("/getAll", getAll)

route.get("/getOne/:id", getOne)
route.get("/phProduct/:email", pharmacyProduct)
route.get("/getById/:id",pharmacyProductWithId)
route.get('/checkOne/:emailpharmacy/:codebarMissing', controlMissing)
route.get('/findUser/:emailpharmacyOne', findOneMissing)
route.post("/createProduct", create)
route.patch("/updateProduct/:id", update)
route.patch("/updateProductQuantity/:id", updateQ)
route.delete("/deleteProduct/:id", deleteOne)
// route.get("/getProductByCodebar/:codebar", getProductByCodebar);
route.get("/getProductByName/:searchByProdName", searchByName);
route.get("/getProductLike/:searchLike", searchNameLike);
route.get("/getCodeBarNoDup/:codeBarNoDup",searchByBarcodeNoDup)
route.get("/getAllCodeBarNoDup/:codeBarAllNoDup",searchAllByBarcodeNoDup)


module.exports = route;