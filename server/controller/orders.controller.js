const {
  Order,
  Missing,
  Products,
  User,
  Pharmacy,
  Payment,
} = require("../database/index.js");
const { Op, Sequelize } = require("sequelize");
module.exports = {
  getAll: async (req, res) => {
    try {
      const { id } = req.params;

      const getAll = await Order.findAll({
        // where: {
        //   order_id: id,
        // },
        include: [{ model: User }, { model: Products }],
      });

      res.json(getAll);
    } catch (err) {
      console.log("Error al obtener todos los usuarios");
      throw err;
    }
  },
  getALL: async (req, res) => {
    try {
      const users = await User.findOne({
        where: { email: req.params.email },
        include: { model: Pharmacy },
      });

      const getAll = await Products.findAll({
        where: {
          PharmacyId: users.Pharmacy.id,
        },
        include: [{ model: Order, include: { model: Products } }],
      });
      const orders = getAll.map((item) => item.Orders).flat();
      res.json(orders);
    } catch (err) {
      console.log("Error al obtener todos los usuarios");
      throw err;
    }
  },
  getOne: async (req, res) => {
    try {
      const getOne = await Order.findOne({
        where: { id: req.params.id },
        include: [{ model: User }, { model: Products }],
      });
      res.json(getOne);
    } catch (error) {
      throw error;
    }
  },
  // create: async (req, res) => {
  //   let userData = req.body;
  //   try {
  //     const userExist = await User.findOne({
  //       where: { email: req.body.email },
  //     });
  //     const newOrder = await Order.create({
  //       ...userData,
  //       UserId: userExist.id,
  //     });
  //     const newProduct = await Products.findOne({ id: newOrder.ProductId });
  //     const checkMissing = await Missing.findOne({
  //       where: { codebar: newProduct.codebar },
  //     });

  //     await checkMissing.update({ order: checkMissing.order + 1 });
  //     checkMissing.quota = checkMissing.quantity / checkMissing.order;
  //     await checkMissing.save();

  //     res.json(newOrder);
  //   } catch (error) {
  //     throw error;
  //   }
  // },
  getByUserId: async (req, res) => {
    try {
      const { userId } = req.params;
      const userExist = await User.findOne({
        where: { email: userId },
      });
      const userOrders = await Order.findAll({
        where: {
          UserId: userExist.id,
        },
        include: [
          {
            model: Products,
            include: {
              model: Pharmacy,
            },
          },
          {
            model: Payment,
          },
          {
           model: User,
          },
        ],
      });
  
      res.json(userOrders);
    } catch (err) {
      console.log("Error while fetching orders for user");
      throw err;
    }
  },
  getOrderByUser: async (req, res) => {
    try {
      const { userId } = req.params;
      const userExist = await User.findOne({
        where: { email: userId },
      });
      const userOrders = await Order.findAll({
        where: {
          UserId: userExist.id,
        },
        include: [
          {
            model: Products,
            include: {
              model: Pharmacy,
            },
          },
          {
            model: Payment,
          },
          {
            model: User,
          },
        ],
      });

      res.json(userOrders);
    } catch (err) {
      console.log("Error while fetching orders for user");
      throw err;
    }
  },

  getOrderPerMonth: async (req, res) => {
    try {
      const currentMonth = new Date().getMonth() + 1;
      const currentYear = new Date().getFullYear();
      const monthStart = new Date(currentYear, currentMonth - 1, 1);
      const monthEnd = new Date(currentYear, currentMonth, 0, 23, 59, 59);

      const orderData = await Order.findAll({
        where: {
          createdAt: {
            [Op.between]: [monthStart, monthEnd],
          },
        },
      });

      res.json(orderData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  create: async (req, res) => {
    let userData = req.body;
    try {
      const userExist = await User.findOne({
        where: { email: req.body.email },
      });
      const newOrder = await Order.create({
        ...userData,
        UserId: userExist.id,
      });
      const newProduct = await Products.findOne({ id: newOrder.ProductId });

      // Fetch all Missing records
      const allMissing = await Missing.findAll();

      // Update each Missing record
      for (const missing of allMissing) {
        await missing.update({
          order: missing.order + req.body.quantityOrdered,
        });
        missing.quota = missing.quantity / missing.order;
        await missing.save();
      }

      res.json(newOrder);
    } catch (error) {
      throw error;
    }
  },
  getAllDeclaredMissed: async (req, res) => {
    try {
      const getAllMissed = await Missing.findAll({
        where: {
          quota: {
            [Op.lt]: 1,
          },
        },
      });
      const getMissingProd = await Promise.all(
        getAllMissed.map(async (item) => {
          try {
            const getOne = await Products.findOne({
              where: {
                codebar: item.codebar,
              },
            });
            return getOne;
          } catch (error) {
            console.log("Error fetching product by codebar:", err.message);
            throw error;
          }
        })
      );
      res.send(getMissingProd);
    } catch (err) {
      console.log("Error al obtener todos los usuarios");
      throw err;
    }
  },
  updateOrder: async (req, res) => {
    // get the order_id from the request parameters
    const updatedData = req.body; // the new data for the order

    console.log(updatedData);
    try {
      await Order.update(updatedData, {
        where: { id: req.params.id },
      });
      res.json({ message: "Order updated successfully" });
    } catch (error) {
      console.log("Error while updating order");
      throw error;
    }
  },

  deleteOne: async (req, res) => {
    let id = req.params.id;
    try {
      const deletedUser = await Order.destroy({
        where: { id: id },
      });
      res.json(deletedUser);
    } catch (error) {
      throw error;
    }
  },
  calculateTotalAmount: async (req, res) => {
    try {
      const allOrders = await Order.findAll();
      if (!allOrders.length) {
        return res.json({ totalAmount: 0 });
      }
      const totalAmount = allOrders.reduce((total, order) => {
        const orderTotal = order.quantityOrdered * order.total;
        return total + orderTotal;
      }, 0);
      res.json({ totalAmount });
    } catch (error) {
      console.error("Error calculating total amount of orders:", error);
      throw error;
    }
  },
  getDailyOrderCount: async (req, res) => {
    try {
      // Fetch the pharmacy user based on the provided email
      const pharmacyUser = await User.findOne({
        where: {
          email: req.params.email,
        },
      });

      if (!pharmacyUser) {
        return res.status(404).json({ error: "Pharmacy not found" });
      }

      // Calculate the start and end of the current day
      const today = new Date();
      const startDate = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate()
      );
      const endDate = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() + 1
      );

      // Fetch orders associated with the pharmacy for the current day
      const dailyOrders = await Order.count({
        where: {
          UserId: pharmacyUser.id,
          createdAt: {
            [Op.between]: [startDate, endDate],
          },
        },
      });

      res.json({ dailyOrderCount: dailyOrders || 0 });
    } catch (error) {
      console.error("Error calculating daily order count:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};
