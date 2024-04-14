const { Availability, Day, Doctor,User } = require("../database/index.js");
const { Op } = require("sequelize");

module.exports = {
  getAvaibility: async (req, res) => {
    try {
      const getUser=await User.findOne({where:{email:req.params.dayId}})
      const getAllOrders = await Doctor.findOne({
        where: { id:getUser.DoctorId},
        include: {
          model: Day,
          include: Availability,
        },
      });
      
      // const getAll = await Doctor.findAll({include:{ all: true, nested: true }})

      res.status(200).send(getAllOrders);
    } catch (error) {
      throw new Error(error);
    }
  },
  getAvaibilityOf: async (req, res) => {
    try {

      const getAllOrders = await Doctor.findOne({
        where: { id: req.params.docIdInClient },
        include: {
          model: Day,
          include: Availability,
        },
      });
      // const getAll = await Doctor.findAll({include:{ all: true, nested: true }})

      res.status(200).send(getAllOrders);
    } catch (error) {
      throw new Error(error);
    }
  },
  
  getAivabilityOfDay: async (req, res) => {
    try {
      const getHours = await Availability.findAll({
        where: {
          availability: { [Op.like]: req.params.aiv },
          DayId: { [Op.like]: req.params.dayId },
        },
      });
      res.status(200).send(getHours)
    } catch (error) {
      throw new Error(error);
    }
  },
  updateAvaibility: async (req,res)=>{
    try {
        const updateStatus = await Availability.update(req.body,{where:{id:req.params.idHour}})
        res.json(updateStatus)
    } catch (error) {
        throw new Error(error)
    }
  },
  deleteAvailability: async (req,res)=>{
    try {
        const delt = await Availability.destroy({where:{DayId:req.params.idOfDay}})
        res.json("deleted")
    } catch (error) {
        throw new Error(error)
    }
} 
};
