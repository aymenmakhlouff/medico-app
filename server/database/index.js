const { Sequelize, DataTypes } = require("sequelize");
const config = require("../config.js");
console.log(config.DB_NAME);
console.log(config.DB_USER);
console.log(config.DB_PASSWORD);

const connection = new Sequelize(
  config.DB_NAME,
  config.DB_USER,
  config.DB_PASSWORD,
  {
    dialect: "mysql",
    host: "localhost",
  }
);

connection
  .authenticate()
  .then(() => console.log("connection established"))
  .catch((error) => {
    throw error;
  });

const User = require("./models/user.js")(connection, DataTypes);
const Review = require("./models/reviews.js")(connection, DataTypes);
const Record = require("./models/records.js")(connection, DataTypes);
const Products = require("./models/products.js")(connection, DataTypes);
const Pharmacy = require("./models/pharmacy.js")(connection, DataTypes);
const Doctor = require("./models/doctor.js")(connection, DataTypes);
const Order = require("./models/orders.js")(connection, DataTypes);
const Categories = require("./models/categories.js")(connection, DataTypes);
const Day = require("./models/day.js")(connection, DataTypes);
const Speciality = require("./models/speciality.js")(connection, DataTypes);
const Availability = require("./models/availabilty.js")(connection, DataTypes);
const AppointementList = require("./models/appointementList.js")(
  connection,
  DataTypes
);
const Missing = require("./models/missing.js")(connection, DataTypes);
const Payment = require("./models/payment.js")(connection, DataTypes);

Pharmacy.hasOne(User);
User.belongsTo(Pharmacy);

Doctor.hasOne(User);
User.belongsTo(Doctor);

User.hasMany(Review);
Review.belongsTo(User);

Doctor.hasMany(Review);
Review.belongsTo(Doctor);

Pharmacy.hasMany(Review);
Review.belongsTo(Pharmacy);

Categories.hasMany(Products);
Products.belongsTo(Categories);

Doctor.hasMany(Record);
Record.belongsTo(Doctor);

Pharmacy.hasMany(Record);
Record.belongsTo(Pharmacy);

Products.hasMany(Record);
Record.belongsTo(Products);

Pharmacy.hasMany(Products);
Products.belongsTo(Pharmacy);

Products.hasMany(Order);
Order.belongsTo(Products);

User.hasMany(Order);
Order.belongsTo(User);

Doctor.hasMany(Day);
Day.belongsTo(Doctor);

Speciality.hasMany(Doctor);
Doctor.belongsTo(Speciality);

Day.hasMany(Availability);
Availability.belongsTo(Day);

Doctor.hasMany(AppointementList);
AppointementList.belongsTo(Doctor);
// User.belongsToMany(Review, { through: 'UserReview' })
// Review.belongsToMany(User, { through: 'UserReview' })

Products.belongsToMany(Review, { through: "ProductReview" });
Review.belongsToMany(Products, { through: "ProductReview" });

// Doctor.belongsToMany(Review, { through: 'DoctorReview' })
// Review.belongsToMany(Doctor, { through: 'DoctorReview' })

User.hasMany(AppointementList);
AppointementList.belongsTo(User);

Availability.hasMany(AppointementList);
AppointementList.belongsTo(Availability);

Day.hasMany(AppointementList);
AppointementList.belongsTo(Day);

Order.hasOne(Payment);
Payment.belongsTo(Order);

// connection
//   .sync({force: true })
//   .then(() => console.log("tables created"))
//   .catch((error) => {throw error;});

module.exports = {
  Payment,
  User,
  Products,
  Review,
  Record,
  Doctor,
  Order,
  Pharmacy,
  Categories,
  Day,
  Availability,
  AppointementList,
  Speciality,
  Missing,
};
