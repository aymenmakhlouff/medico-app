const {Pharmacy, User, Record} = require('../database/index')
const { Op } = require("sequelize");
const pharmacy = require('../database/models/pharmacy');


module.exports = {
    getAll: async (req, res) => {
      try {
        const getAll = await Pharmacy.findAll({});
        res.json(getAll);
      } catch (err) {
        console.log("Error al obtener todos los usuarios");
        throw err;
      }
    },
    getOne: async (req, res) => {
      try {
        const getUser = await User.findOne({ where: { email: req.params.email } });
    
        if (!getUser) {
          return res.status(404).json({ message: 'User not found' });
        }
    
        if (!getUser.PharmacyId) {
          return res.status(400).json({ message: 'User does not have a PharmacyId' });
        }
    
        const onePharm = await Pharmacy.findOne({ where: { id: getUser.PharmacyId } });
    
        if (!onePharm) {
          return res.status(404).json({ message: 'pharmacy not found' });
        }
    
        res.json(onePharm);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
    },
    create: async (req, res) => {
      let pharmacyData = req.body;
     
  
      try {
        const newPharmacy = await Pharmacy.create(pharmacyData);
        res.json(newPharmacy);
      } catch (error) {
        throw error;
      }
    },
    update: async (req, res) => {
      let id = req.params.id;
      let dataToUpdate = req.body;
      try {
        const updatedPharmacy = await Pharmacy.update(dataToUpdate, {
          where: { id: Number(id) },
        });
        res.json(updatedPharmacy);
        } catch (error) {
        throw error;
      }
    },
    deleteOne: async (req, res) => {
      let id = req.params.id;
      try {
        const deletedPharmacy = await Pharmacy.destroy({
          where: { id: Number(id) },
        });
        res.json(deletedPharmacy);
      } catch (error) {
        throw error;
      }
    },
    migratePharmacy : async(req , res)=>{
      try {
          const added = await Pharmacy.create(req.body)
          console.log('this is the added',added);
          const oneDoc = await User.update({type : "pharmacy",PharmacyId:added.id},{where: {email : req.body.email}});
          res.json(oneDoc);
      } catch (error) {
          throw error
      }
  },
  getAivablePharma: async (req, res) => {
    try {
      const getPharma = await Pharmacy.findAll({
        where: {
        isBlocked: { [Op.like]: req.params.blockPharma },
        isverified: { [Op.like]: req.params.verefPharma },
        },
      });
      res.status(200).send(getPharma)
    } catch (error) {
      throw new Error(error);
    }
  },
  getAivablePharmaDayNight: async (req, res) => {
    try {
      const getPharma = await Pharmacy.findAll({
        where: {
        isBlocked: { [Op.like]: req.params.isBlockPharma },
        isverified: { [Op.like]: req.params.isVerefPharma },
        type:{[Op.like]: req.params.typeDN}
        },
      });
      res.status(200).send(getPharma)
    } catch (error) {
      throw new Error(error);
    }
  },
  getAivablePharmaDayNightMapped: async (req, res) => {
    try {
      const getPharma = await Pharmacy.findAll({
        where: {
        isBlocked: { [Op.like]: req.params.isBlockPharmaMapped },
        isverified: { [Op.like]: req.params.isVerefPharmaMapped },
        type:{[Op.like]: req.params.typeDNMapped}
        },
      });
      const structeredData = getPharma.map((e)=>{
        return{         
          id: e.id,
          name:e.PHname,
          imageUrl: e.iimageUrl,
          type: "Pharmacy",
          availability: e.type,
          latitude: e.latitude,
          longitude: e.longitude,
          adress: e.adress,
          speciality:""
        }
      })
      res.status(200).send(structeredData)
    } catch (error) {
      throw new Error(error);
    }
  },
  updataLongLat:async (req, res) => {
    try {
      const longLat = await Pharmacy.update(req.body,{where:{id:req.params.id}})
      res.send(longLat)
    } catch (error) {
      throw error
    }
  },
  updateLocation : async(req , res)=>{
    try {
        console.log(req.body);
        
         const oneDoc = await User.findOne({where: {email : req.body.email}});
         const doc = await Pharmacy.update({longitude :req.body.longitude, latitude : req.body.latitude},{where: {id : oneDoc.PharmacyId}});


        res.send(doc);
    } catch (error) {
        throw error
    }
},
recordsDoc : async(req , res)=>{
  try {
  const pharmId = await User.findOne({where: {email : req.body.email}});

     await Record.create ({
              ...req.body,
              PharmacyId : pharmId.id
          })
  
  
      res.json('created')
  } catch (error) {
      res.json(error)
  }
},
getAivablePharmaMapped: async (req, res) => {
  try {
    const getPharma = await Pharmacy.findAll({
      where: {
      isBlocked: { [Op.like]: req.params.blockPharmaMapped },
      isverified: { [Op.like]: req.params.verefPharmaMapped },
      },
    });
    const structeredData = getPharma.map((e)=>{
      return{         
        id: e.id,
        name:e.PHname,
        imageUrl: e.imageUrl,
        type: "Pharmacy",
        availability: e.type,
        latitude: e.latitude,
        longitude: e.longitude,
        adress: e.adress,
        speciality:""
      }
    })
    res.status(200).send(structeredData)
  } catch (error) {
    throw new Error(error);
  }
},
verficationPharm: async (req, res) => {
  try {
    const onePharm = await User.findOne({ where: { email: req.body.email } });
    const pharmm = await Pharmacy.findOne({ where: { id: onePharm.PharmacyId } });
    console.log('========>', pharmm.isverified);
    const doc = await Pharmacy.update(
      { isverified: !pharmm.isverified },
      { where: { id: onePharm.PharmacyId } }
    );


    const updatedDoc = await Pharmacy.findOne({ where: { id: onePharm.PharmacyId } });
    res.json(updatedDoc);
  } catch (error) {
    throw error;
  }
},
fetchAll: async (req, res) => {
  try{
      const getAll = await User.findAll({
          where: {
            type: "pharmacy"
          },
          include:Pharmacy
        })
      res.json(getAll)
  }catch(err){
      throw err;
  }
},
findOneProfile : async(req, res) => {
try {
  const resp = await Pharmacy.findOne({ where: { id: req.params.PharmaProfileId}})
  res.json(resp)
} catch (error) {
throw new Error(error)
}
},
updateImgPharma : async (req, res) => {
  try {
    const {img} = req.body
    const user = await User.findOne({where:{email:req.params.emailImgUpdatePharma}})
    const uppdt = await Pharmacy.update({imageUrl:img},{where :{id:user.PharmacyId}})
  res.json(uppdt)
  } catch (error) {
    throw new Error(error)
  }
},
getOneProfile: async (req, res) => {
  try {
    const user = await User.findOne({where:{email:req.params.emailProfile}})
    if(user.type === "user"){
      res.json(user)
    }
    if(user.type === "pharmacy"){

      const getPh = await Pharmacy.findOne({where:{id:user.PharmacyId}})
      res.json(getPh)
    }
  } catch (error) {
   throw new Error(error) 
  }
}

  };
