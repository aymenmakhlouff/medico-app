const {Record} = require('../database/index')
const { Sequelize } = require("sequelize");

module.exports = {
    getAll : async (req , res)=>{
        try {
            const allDocs = await Record.findAll({})
            res.json(allDocs)
        } catch (error) {
            throw error
        }
    },
    createDocs : async (req , res)=>{
        try {
            const posted = await Record.create(req.body)
            res.json(posted)
        } catch (error) {
            throw error
        }
    },
    deleteOne : async (req , res)=>{
        try {
            const oneDoc = await Record.destroy({where : {id : req.params.id}})
            res.json(oneDoc)
        } catch (error) {
            throw error
        }
    }
}