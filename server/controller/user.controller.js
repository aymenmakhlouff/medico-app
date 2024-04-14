const { User, Doctor, Pharmacy } = require("../database/index");

module.exports = {
  getAll: async (req, res) => {
    try {
      const getAll = await User.findAll({});
      res.json(getAll);
    } catch (err) {
      console.log("Error al obtener todos los usuarios");
      throw err;
    }
  },
  getOne: async (req, res) => {
    try {
      const getOne = await User.findOne({
        where: { email: req.params.email },
        include: {model: Pharmacy}
      });
      res.json(getOne);
    } catch (error) {
      throw error;
    }
  },

  checkUserCredit: async (req, res) => {
    try {
      const getOnee = await User.findOne({
        where: {
          email: req.params.userMail,
        },
        include: [{ model: Pharmacy }],
      });
      res.json(getOnee);
    } catch (error) {
      throw error;
    }
  },
  create: async (req, res) => {
    let userData = req.body;

    try {
      const emailExist = await User.findOne({
        where: { email: userData.email },
      });
      if (emailExist) {
        return res.status(401).send({ message: "El correo ya existe" });
      }
      const newUser = await User.create(userData);
      res.json(newUser);
    } catch (error) {
      throw error;
    }
  },
  update: async (req, res) => {
    let id = req.params.id;
    let dataToUpdate = req.body;
    try {
      const updatedUser = await User.update(dataToUpdate, {
        where: { id: Number(id) },
      });
      res.json(updatedUser);
    } catch (error) {
      throw error;
    }
  },
  deleteOne: async (req, res) => {
    let id = req.params.id;
    try {
      const deletedUser = await User.destroy({
        where: { id: Number(id) },
      });
      res.json(deletedUser);
    } catch (error) {
      throw error;
    }
  },
  SignIn: async (req, res) => {
    let userData = req.body;

    try {
      const emailExist = await User.findOne({
        where: { email: userData.email },
        include: Doctor,
      });
      // if(emailExist.DoctorId&&!emailExist?.Doctor.isverified){
      //   return res.status(401).send({ message : "you are not verified yet!"})
      // }
      if (!emailExist) {
        return res.status(400).send({ message: "email is not valid" });
      }
      res.json(emailExist);
    } catch (error) {
      throw error;
    }
  },
  updataLongLat: async (req, res) => {
    try {
      const oneUser = await User.findOne({where:{email:req.params.emailLatLongit}}); 
      const longLat = await User.update(req.body, {
        where: { id: oneUser.id }
      });
      res.json(longLat);
    } catch (error) {
      throw new Error(error);
    }
  },
  getUserNameById: async (req, res) => {
    const userId = req.params.id;

    try {
      const user = await User.findOne({
        attributes: ["username"],
        where: { id: userId },
      });

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      res.json({ username: user.username });
    } catch (error) {
      console.error("Error fetching username:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  getUserByid: async (req, res) => {
    try {
      const user = await User.findOne({ where: { id: req.params.getById }, include:{model: Pharmacy} });
      res.json(user);
    } catch (error) {
      throw new Error(error);
    }
  },
  updateImaeUser : async (req, res) => {
    try {
      const {imgURL} = req.body
      // const user = await User.findOne({where:{email:req.params.emailUpImg}})
      const updt = await User.update({imgUrl:imgURL},{where:{email:req.params.emailUpImg}})
      res.json(updt);
    } catch (error) {
      throw new Error(error);
    }
  },
  updateUser : async (req, res) => {
    try {
      const {name}=req.body
      const result = await User.update({username:name},{where:{email:req.params.emailUss}})
      res.json(result);
    } catch (error) {
      throw new Error(error)
    }
  }
};
