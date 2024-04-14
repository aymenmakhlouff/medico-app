const route = require("express").Router();
const {
  getAll,
  getALL,
  getOne,
  create,
  getAllDeclaredMissed,
  getOrderPerMonth,
  updateOrder,
  deleteOne,
  getByUserId,
  calculateTotalAmount,
  getDailyOrderCount,
  getOrderByUser
  // calculateDailyOrderAmount
} = require("../controller/orders.controller");

route.get("/getAll",getAll)
route.get("/getById/:prodId", getOrderByUser);
route.get("/oneOrder/:id",getOne)
route.get("/getById/:userId",getByUserId)
route.get("/getMissed",getAllDeclaredMissed)
route.patch("/update/:id",updateOrder)
route.post("/createOrder",create)
route.delete("/deleteOrder/:id",deleteOne)

route.get("/getAll/:email", getALL);
route.get('/dailyTotalOrder/:email', getDailyOrderCount);
route.get("/getPerMonth", getOrderPerMonth);
route.get("/totalOrder", calculateTotalAmount)
module.exports = route;
