const { Categories } = require("../database/index");

module.exports = {
  getAll: async (req, res) => {
    try {
      const getAll = await Categories.findAll({});
      res.json(getAll);
    } catch (err) {
      console.log("Error al obtener todos los usuarios");
      throw err;
    }
  },
  getOne: async (req, res) => {
    try {
      const getOneCategories = await Categories.findOne({
        where: {id: req.params.id}
      })
      res.json(getOneCategories)
    } catch (error) {
      throw error
    }
  },
  create: async (req, res) => {
    try {
      let category = req.body;
      if (!category.name || !category.description) {
        return res.status(400).send({ message: "Faltan campos" });
      }
      const newCategory = await Categories.create(category);
      res.json(newCategory);
    } catch (err) {
      console.log("Error al crear una categoria");
      throw err;
    }
  },
  update: async (req, res) => {
    let id = req.params.id;
    let dataToUpdate = req.body;
    try {
      const updatedCategories = await Categories.update(dataToUpdate, {
        where: { id: Number(id) },
      });
      res.json(updatedCategories);
    } catch (error) {
      throw error;
    }
  },
  deleteOne: async (req, res) => {
    let id = req.params.id;
    try {
      const deletedCategories = await Categories.destroy({
        where: { id: Number(id) },
      });
      res.json(deletedCategories);
    } catch (error) {
      throw error;
    }
  },
};