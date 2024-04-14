const route = require("express").Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const {Payment, Order} = require("../database/index.js")


route.post("/intents", async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: "usd",
      payment_method_types: ['card'],
      automatic_payment_methods: {
        enabled: false,
      },
    });

    // Create a new payment in your database
    const payment = await Payment.create({
      OrderId: req.body.orderId,
      amount: req.body.amount,
      currency: "usd",
      paymentIntentId: paymentIntent.id,
      status: paymentIntent.status,
    });

    await Order.update({ isPayed: true }, {
      where: { id: req.body.orderId },
    });

    // await getbill({
    //   body: {
    //     userEmail: req.body.userEmail,
    //     mymedecine: req.body.mymedecine,
    //     mydescription: req.body.mydescription,
    //     myprice: req.body.myprice,
    //   },
    // }, res);

    res.json({ paymentIntent: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
});

route.get("/getAll", async (req, res) => {
  try {
    const payments = await Payment.findAll();
    res.json(payments);
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
});

module.exports = route;