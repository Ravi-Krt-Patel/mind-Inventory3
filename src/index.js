const express = require('express');
const db = require("./connection/db")
const cors = require('cors')
const helmat = require('helmet')
const morgan = require('morgan')
//create table not exist


//all controllers 
// const userController = require('./controllers/user.controller/user.controller.creation')
// const controllers = require("./controllers/index");



const app = express();
app.use(helmat())
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))
app.use(express.urlencoded({extended:false}))

db.sequelize.sync()


//calling controller
// app.use('/user', controllers.userController.userCreation)
// app.use('/product', controllers.productController.productCreation)

const port = 2323;
app.listen(port, async()=>{
    console.log("app is working on port 2323")
})