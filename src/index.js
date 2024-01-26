const express = require('express');
const db = require("./connection/db")
const cors = require('cors')
const helmat = require('helmet')
const morgan = require('morgan')


//all controllers 
const employeeControoler = require('./controllers/employee.controller')



const app = express();
app.use(helmat())
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))
app.use(express.urlencoded({extended:false}))

db.sequelize.sync()


//calling controller
app.use('/api/v1', employeeControoler)

const port = 2323;
app.listen(port, async()=>{
    console.log("app is working on port 2323")
})