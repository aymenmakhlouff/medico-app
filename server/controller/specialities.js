const { Speciality } = require("../database/index");

module.exports = {
  getAll: async (req, res) => {
    try {
      const getAll = await Speciality.findAll({});
      res.json(getAll);
    } catch (err) {
      console.log("Error al obtener todos los usuarios");
      throw err;
    }
  },
  create: async (req, res) => {
    try {
        const added = await Speciality.create(req.body)
        res.json(added)
    } catch (error) {
        throw error
    }
  },
  update: async (req, res) => {
    let id = req.params.id;
    let dataToUpdate = req.body;
    try {
      const updatedSpeciality = await Speciality.update(dataToUpdate, {
        where: { id: Number(id) },
      });
      res.json(updatedSpeciality);
    } catch (error) {
      throw error;
    }
  },
  deleteOne: async (req, res) => {
    let id = req.params.id;
    try {
      const deletedSpeciality = await Speciality.destroy({
        where: { id: Number(id) },
      });
      res.json(deletedSpeciality);
    } catch (error) {
      throw error;
    }
  },
};
