require('dotenv').config()
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();


const authRoutes = require('./routes/authentication')
const userRoutes = require('./routes/user')
const categoryRoutes = require('./routes/category')
const productRoutes = require('./routes/product')
const orderRoutes = require('./routes/order')
const stripeRoutes = require('./routes/StripePayment')
const paypalRoutes = require('./routes/paypalPayment')

//DB Connections
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
}).then(()=>{
    console.log('DB CONNECTED.....');
    
})


//Middlewares
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors())


//Routes
app.use('/api',authRoutes)
app.use('/api',userRoutes)
app.use('/api',categoryRoutes)
app.use('/api',productRoutes)
app.use('/api',orderRoutes)
app.use('/api',stripeRoutes)
app.use('/api',paypalRoutes)

//PORT
const port = process.env.PORT;

//Starting Server
app.listen(port, () => {
  console.log(`App is running at ${port}`);
});
