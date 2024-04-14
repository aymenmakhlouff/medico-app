const { AppointementList,Doctor,User,Availability,Day,Speciality } = require("../database/index");
const { Op } = require("sequelize");


module.exports = {
    updateStatus: async (req,res)=>{
        try {
            const updateStatus = await AppointementList.update(req.body,{where:{id:req.params.idAppoint}})
            res.json(updateStatus)
        } catch (error) {
            throw new Error(error)
        }
      },
    postAppointement: async (req,res)=>{
        try {
          const getUser = await User.findOne({where: {email:req.params.userPost}})
          const{docId,availabId,dayID}=req.body
            const addAppointement = await AppointementList.create({
              DoctorId:docId,
              UserId:getUser.id,
              AvailabilityId:availabId,
              DayId:dayID
            })
            res.json(addAppointement)
        } catch (error) {
            throw new Error(error)
        }
      },
    getAppointement: async (req,res)=>{
        try {
          const getUser = await User.findOne({where: {email:req.params.Docid}})

            const getAppointement = await AppointementList.findAll({
                where: {
                    status: { [Op.like]: req.params.status },
                    DoctorId: { [Op.like]: getUser.DoctorId },
                  },
                  include: [
                    {
                      model: Doctor,
                    },
                    {
                      model: User,
                    },
                    {
                      model: Availability,
                    },
                    {
                      model: Day,
                    },
                  ],
                  order: [['createdAt', 'DESC']]
              });
            res.json(getAppointement)
        } catch (error) {
            throw new Error(error)
        }
      },
    getAppointementAll: async (req,res)=>{
        try {

          const getUser = await User.findOne({where: {email:req.params.DocidAll}})
            const getAppointement = await AppointementList.findAll({
                where: {
                    DoctorId: { [Op.like]: getUser.DoctorId}
                  },
                  include: [
                    {
                      model: Doctor,
                    },
                    {
                      model: User,
                    },
                    {
                      model: Availability,
                    },
                    {
                      model: Day,
                    },
                  ],
                  order: [['createdAt', 'DESC']]
              });
            res.json(getAppointement)
        } catch (error) {
            throw new Error(error)
        }
      },
    getAppointementAllFilter: async (req,res)=>{
        try {

          const getUser = await User.findOne({where: {email:req.params.DocidEmail}})
            const getAppointement = await AppointementList.findAll({
                where: {
                    DoctorId: { [Op.like]: getUser.DoctorId},
                    status: { [Op.like]: req.params.statusFilter },
                  },
                  include: [
                    {
                      model: Doctor,
                    },
                    {
                      model: User,
                    },
                    {
                      model: Availability,
                    },
                    {
                      model: Day,
                    },
                  ],
                  order: [['createdAt', 'DESC']]
              });
            res.json(getAppointement)
        } catch (error) {
            throw new Error(error)
        }
      },
    getAppointementUser: async (req,res)=>{
        try {
          const getUser = await User.findOne({where: {email:req.params.userID}})

            const getAppointement = await AppointementList.findAll({
                where: {
                    status: { [Op.like]: req.params.Statu },
                    UserId: { [Op.like]: getUser.id },
                  },
                  include: [
                    {
                      model: Doctor,
                      include:{model:Speciality}
                
                    },
                    {
                      model: User,
                    },
                    {
                      model: Availability,
                    },
                    {
                      model: Day,
                    },
                  ],
                  order: [['createdAt', 'DESC']]
              });
              // const speciality = await Speciality.findAll({where:{id:getAppointement.Doctor.specialityId}})
            res.json(getAppointement)
        } catch (error) {
            throw new Error(error)
        }
      },
    getAppointementAllUser: async (req,res)=>{
        try {
          const getUser = await User.findOne({where: {email:req.params.userIDAll}})

            const getAppointement = await AppointementList.findAll({
                where: {
                    UserId: { [Op.like]: getUser.id },
                  },
                  include: [
                    {
                      model: Doctor,
                      include:{model:Speciality}
                
                    },
                    {
                      model: User,
                    },
                    {
                      model: Availability,
                    },
                    {
                      model: Day,
                    },
                  ],
                  order: [['createdAt', 'DESC']]
              });
              // const speciality = await Speciality.findAll({where:{id:getAppointement.Doctor.specialityId}})
            res.json(getAppointement)
        } catch (error) {
            throw new Error(error)
        }
      },
      deleteAppoint: async (req,res)=>{
        try {
            const delt = await AppointementList.destroy({where:{DayId:req.params.DayOf}})
            res.json("deleted")
        } catch (error) {
            throw new Error(error)
        }
    },
      deleteUserAppoint: async (req,res)=>{
        try {
            const delt = await AppointementList.destroy({where:{id:req.params.idOFAppoi}})
            res.json("deleted")
        } catch (error) {
            throw new Error(error)
        }
    },
    
}