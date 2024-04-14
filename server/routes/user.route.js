const route = require("express").Router();
const {
  getAll,
  getOne,
  checkUserCredit,
  create,
  update,
  deleteOne,
  SignIn,
  updataLongLat,
  getUserNameById,
  getUserByid,
  updateImaeUser,
  updateUser
} = require("../controller/user.controller");

route.put("/updateLongLat/:emailLatLongit", updataLongLat);
route.get("/getAll", getAll);
route.get("/getOneById/:getById", getUserByid);
route.get("/getOne/:email", getOne);
route.get("/getUser/:id", getUserNameById);
route.get("/checkMail/:userMail", checkUserCredit);
route.post("/createUser", create);
route.post("/signIn", SignIn);
route.patch("/updateUser/:id", update);
route.delete("/deleteUser/:id", deleteOne);
route.put("/updateCloud/:emailUpImg",updateImaeUser)
route.put("/updateNamee/:emailUss",updateUser)

module.exports = route;
