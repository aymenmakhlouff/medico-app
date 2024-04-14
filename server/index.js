
const express = require('express');
require('dotenv').config()
const PaymentRouter = require('./routes/payment.route.js')
const UserRouter = require('./routes/user.route.js')
const DoctorRouter = require('./routes/doctor.route.js')
const specialityRoute = require('./routes/specialities.js')
const OrdersRouter = require('./routes/orders.route.js')
const DayRouter = require('./routes/day.router.js')
const PharmacyRouter = require('./routes/pharmacy.route.js')
const ProductRouter = require('./routes/product.route.js')
const AppointementRouter = require('./routes/appointement.route.js')
const AppointementListRouter = require('./routes/appointementList.route.js')
const ReviewRouter = require('./routes/reviews.route.js')
const NodemailerRoute = require('./routes/nodemailer.route.js')
const Categories = require('./routes/categories.route.js')
require('colors');
const RecordsRouter = require('./routes/records.route.js')
const morgan = require('morgan')
const cors = require('cors')
const app = express();   
const port = 1128; 
app.use(express.json());
require("./database/index.js")
const swaggerUi = require('swagger-ui-express');
app.use(
  morgan((tokens, req, res) => {
    const method = tokens.method(req, res);
    const status = tokens.status(req, res);
    const coloredMethod =
      method === 'GET'
        ? method.green
        : method === 'POST'
        ? method.blue
        : method === 'PUT'
        ? method.yellow
        : method === 'DELETE'
        ? method.red
        : method;

    return [
      coloredMethod,
      tokens.url(req, res),
      status.brightYellow,
      tokens.res(req, res, 'content-length'),
      '-',
      tokens['response-time'](req, res),
      'ms',
    ].join(' ');
  })
);


app.use('/swagger', swaggerUi.serve, swaggerUi.setup(null, { swaggerOptions: { url: '/swagger.json' } }));

app.use(express.json());
app.use(cors())

app.use('/api/user', UserRouter)
app.use('/api/doctor', DoctorRouter)
app.use('/api/specialities', specialityRoute)
app.use('/api/Product', ProductRouter)
app.use('/api/orders', OrdersRouter)
app.use('/api/day', DayRouter)
app.use('/api/pharmacy',PharmacyRouter)
// app.use('/api/product',ProductRouter)
app.use('/api/aivability',AppointementRouter)
app.use('/api/appointement',AppointementListRouter)
app.use('/api/records',RecordsRouter)
app.use('/api/payment', PaymentRouter)
app.use('/api/reviews', ReviewRouter)
app.use('/api/category',Categories)
app.use('/api/email', NodemailerRoute)

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
