const { Sequelize } = require('sequelize');
require('dotenv').config();

const databaseName = process.env.DATABASENAME
const userName = process.env.USERNAME2
const password = process.env.PASSWORD

// const sequelize = new Sequelize(databaseName, userName, password, {
//     host: 'sql6.freesqldatabase.com',
//     dialect:'mysql' /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
//   })

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: '/home/jignesh/Project/backend_new/fb/db.sqlite3'
});

sequelize.authenticate()
.then(() => {
  console.log('Connection has been established successfully.');
})
.catch((err) => {
  console.error('Unable to connect to the database:', err);
});

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

//module - table 
db.employee = require('../models/employeeModel/employee.model')(sequelize, Sequelize)
db.leave = require('../models/leaveModel/leave.model')(sequelize, Sequelize)
db.depatment = require('../models/deparmentMode/department.model')(sequelize, Sequelize)

module.exports = db;
