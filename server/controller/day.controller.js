const {Day,Availability,User} = require('../database/index')
const createHours =async (dayId)=>{
    for (let index = 9; index <= 23; index++) {
        let hour = `${index}:00`
        const createHours = await Availability.create({DayId:dayId,hour})        
    }
}
module.exports ={
    
    dayAvailability: async (req, res) => {
        try{
            const getUser = await User.findOne({where: {email:req.params.doctorId}})
            console.log(req.body);
            const x = req.body.map(async(day)=>{
                const createDay = await Day.create({day:day.day,DoctorId:getUser.DoctorId})
                createHours(createDay.id)
            })
            res.json("created")

        }catch(err){
            console.log("Days not created")
            throw err;
        }
    },
    deleteDay: async (req,res)=>{
        try {
            const delt = await Day.destroy({where:{id:req.params.IdDay}})
            res.json("deleted")
        } catch (error) {
            throw new Error(error)
        }
    } 
    
}
