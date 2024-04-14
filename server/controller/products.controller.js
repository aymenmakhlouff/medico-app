const { Products, Missing, User, Pharmacy, Categories } = require("../database/index");
const { Op,Sequelize } = require("sequelize");


module.exports = {
  getAll: async (req, res) => {
    try {
      const getAll = await Products.findAll({ include: { model: Pharmacy } });

      res.json(getAll);
    } catch (err) {
      console.log("Error al obtener todos los productos", err);
      res.status(500).json({ error: "Error al obtener todos los productos" });
    }
  },
  getOne: async (req, res) => {
    try {
      const getOne = await Products.findOne({
        where: { id: req.params.id },
        include: [
          {model: Categories}
        ]
      });
      res.json(getOne);
    } catch (error) {
      throw error;
    }
  },
  // getProductByCodebar: async (req, res) => {
  //   let codebar = req.params.codebar;
  //   try {
  //     const product = await Products.findOne({
  //       where: { codebar: Number(codebar) },
  //     });
  //     if (product) {
  //       res.json(product);
  //     } else {
  //       res.status(404).json({ error: "Product not found" });
  //     }
  //   } catch (error) {
  //     console.log("Error in server", error);
  //     res.status(500).json({ error: "Error in server" });
  //   }
  // },
  pharmacyProduct: async (req, res) => {
    try {
      const users = await User.findAll({
        where: { email: req.params.email },
      });

      if (users.length === 0) {
        return res.status(404).json({ error: "User not found." });
      }

      const pharmacyId = users[0].PharmacyId; 

      const products = await Products.findAll({
        where: {
          PharmacyId: pharmacyId,
        },
      });

      res.json(products);
    } catch (error) {
      console.error("Error fetching pharmacy products:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  pharmacyProductWithId: async (req, res) => {
    try {
      const pharmacy = await Pharmacy.findOne({
        where: { id:req.params.id },
      });
  
      if (!pharmacy) {
        return res.status(404).json({ error: "Pharmacy not found." });
      }
  
      const pharmacyId = pharmacy.id;
  
      const products = await Products.findAll({
        where: {
          PharmacyId: pharmacyId,
        },
      });
  
     res.json(products);
    } catch (error) {
      console.error("Error fetching pharmacy products:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  create: async (req, res) => {
    let product = req.body;
    try {
      const findUser = await User.findOne({ where: { email: req.body.email } });
      console.log(findUser, "this is the use found");
      const newProduct = await Products.create({
        ...product,
        PharmacyId: findUser.PharmacyId,
      });
      console.log(newProduct.codebar);
      const checkMissing = await Missing.findOne({
        where: { codebar: newProduct.codebar },
      });
      console.log("checkMissing");
      if (checkMissing) {
        console.log("checkMissing exist", checkMissing);
        const done = await checkMissing.update(
          { quantity: newProduct.stock + checkMissing.quantity },
          { where: { codebar: newProduct.codebar } }
        );
        checkMissing.quota = checkMissing.quantity / checkMissing.order;
        await checkMissing.save();
      }
      if (!checkMissing) {
        console.log(" not checkMissing exist", checkMissing);
        const data = await Missing.create({
          codebar: newProduct.codebar,
          quantity: newProduct.stock,
        });
      }

      res.status(200).send(checkMissing);
    } catch (error) {
      console.log("Error en el servidor", error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },
  update: async (req, res) => {
    let id = req.params.id;
    let dataToUpdate = req.body;
    try {
      const getProd = await Products.findOne({
        where: { id: Number(id) },
      });
      const checkMissing = await Missing.findOne({
        where: { codebar: getProd.codebar },
      });
      if (getProd && getProd.stock < req.body.stock) {
        console.log("ooutside");
        let diff = req.body.stock - getProd.stock;
        await checkMissing.update(
          { quantity: diff + checkMissing.quantity },
          { where: { codebar: getProd.codebar } }
        );
        checkMissing.quota = checkMissing.quantity / checkMissing.order;
        await checkMissing.save();
      }
      if (getProd && getProd.stock > req.body.stock) {
        console.log("INSIDE");
        let diff = getProd.stock - req.body.stock;
        await checkMissing.update(
          { quantity: checkMissing.quantity - diff },
          { where: { codebar: getProd.codebar } }
        );
        checkMissing.quota = checkMissing.quantity / checkMissing.order;
        await checkMissing.save();
      }
      const updatedProduct = await Products.update(dataToUpdate, {
        where: { id: Number(id) },
      });
      res.json(checkMissing);
    } catch (error) {
      console.log("Error en el servidor", error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },
  updateQ: async (req, res) => {
    try {
      const upd = await Products.update(req.body, {
        where: { id: req.params.id },
      });
      res.json(upd);
    } catch (error) {
      throw error;
    }
  },
  deleteOne: async (req, res) => {
    let id = req.params.id;
    try {
      const deletedProduct = await Products.destroy({
        where: { id: Number(id) },
      });
      res.json(deletedProduct);
    } catch (error) {
      console.log("Error en el servidor", error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },
  findOneMissing: async (req, res) => {
    try {
      const pharmacy = await User.findOne({where:{email:req.params.emailpharmacyOne}})
      res.json(pharmacy)
    } catch (error) {
      throw error
    }
  },
  
  controlMissing: async (req, res) => {
    try {
      const {productName, price, stock, description, manufacturer, activeIngredients, dosageForm, strength, packaging, expiryDate, imageURL, sideEffect, codebar, CategoryId } = req.body;
      const pharmacy = await User.findOne({where:{email:req.params.emailpharmacy}})
      const checkProduct = await Products.findOne({where:{ 
        PharmacyId: {[Op.like]:pharmacy.PharmacyId},
        codebar: {[Op.like]:req.params.codebarMissing},
        // stock: {[Op.lte]: 0}
      }
      })
      // if(checkProduct) {
      //   if (checkProduct.stock <= 0) {
      //     const update = await Products.update({stock: stock}, {where: {PharmacyId: pharmacy.PharmacyId}})
      //     res.json(update)
      //   } 
      // } 
      // if (!checkProduct) {
      //   const create = await Products.create({productName:productName, price:price, description:description; manufacturer:manufacturer, activeIngredients:activeIngredients, dosageForm:dosageForm, strength:strength, packaging:packaging,expiryDate:expiryDate,  imageURL:imageURL,sideEffect:sideEffect, codebar:codebar, CategoryId:CategoryId, PharmacyId:pharmacy.PharmacyId})
      //   res.json(create)
      // }
      if (checkProduct) {
        res.json(true)
      } else {
        res.json(false)
      }
      // res.json(checkProduct)
    } catch (error) {
      throw error
    }
  },
  searchByName: async (req, res) => {
    try {
      const result = await Products.findAll({
        where: {
          [Op.and]: [
            Sequelize.where(
              Sequelize.fn('LOWER', Sequelize.col('productName')),
              'LIKE',
              `%${req.params.searchByProdName.toLowerCase()}%`
            ),
            { stock: { [Op.gt]: 0 } },
          ],
        },
        include: [
          {
            model: Pharmacy,
          },
        ],
      });
      let uniqueProductNames = new Set();
      let arrayWithoutDuplicates = result.filter(obj => {
        if (!uniqueProductNames.has(obj.productName)) {
          uniqueProductNames.add(obj.productName);
          return true;
        }
        return false;
      });
      res.json(arrayWithoutDuplicates);
    } catch (error) {
    throw new Error(error)
    }
  },
  searchNameLike : async (req,res)=>{
    try {
      const result = await Products.findAll({
        where:{
          [Op.and] :[
            { stock: { [Op.gt]: 0 } },
            {productName : {[Op.like]: req.params.searchLike}}
          ]
        },
        include: [
          {
            model: Pharmacy,
          },
        ],
      })
      const structeredData = result.map((e)=>{
        return{
            id: e.Pharmacy.id,
            name:e.productName,
            imageUrl: e.Pharmacy.PHname,
            type: "Product",
            availability: true,
            latitude: e.Pharmacy.latitude,
            longitude: e.Pharmacy.longitude,
            adress: e.Pharmacy.adress,
            speciality:e.imageURL
        }
      })
      res.json(structeredData)
    } catch (error) {
      throw new Error (error)
    }
  },
  searchByBarcode : async (req,res)=>{
    try {
      const result = await Products.findAll({
        where:{
          [Op.and] :[
            { stock: { [Op.gt]: 0 } },
            {codebar : {[Op.like]: req.params.codebarSearch}}
          ]
        }
      })
      res.json(result)
    } catch (error) {
      throw new Error (error)
    }
  },

  searchByBarcodeNoDup: async (req, res) => {
    try {
      const result = await Products.findAll({
        where: {
          [Op.and]: [
            {codebar :{[Op.like]:req.params.codeBarNoDup}},
            { stock: { [Op.gt]: 0 } },
          ],
        },
        include: [
          {
            model: Pharmacy,
          },
        ],
      });
      let codebar = new Set();
      let arrayWithoutDuplicates = result.filter(obj => {
        if (!codebar.has(obj.codebar)) {
          codebar.add(obj.codebar);
          return true;
        }
        return false;
      });
      res.json(arrayWithoutDuplicates);
    } catch (error) {
    throw new Error(error)
    }
  },
  searchAllByBarcodeNoDup: async (req, res) => {
    try {
      const result = await Products.findAll({
        where: {
          [Op.and]: [
            {codebar :{[Op.like]:req.params.codeBarAllNoDup}},
            { stock: { [Op.gt]: 0 } },
          ],
        },
        include: [
          {
            model: Pharmacy,
          },
        ],
      });
      const structeredData = result.map((e)=>{
        return{
            id: e.Pharmacy.id,
            name:e.productName,
            imageUrl: e.Pharmacy.PHname,
            type: "Product",
            availability: true,
            latitude: e.Pharmacy.latitude,
            longitude: e.Pharmacy.longitude,
            adress: e.Pharmacy.adress,
            speciality:e.imageURL
        }
      })
      res.status(200).send(structeredData);
    } catch (error) {
    throw new Error(error)
    }
  },


};
