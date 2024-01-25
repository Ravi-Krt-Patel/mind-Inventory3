const { DataTypes } = require('sequelize');
// const sequelize = new Sequelize('sqlite::memory:');

module.exports = (sequelize, Sequelize) =>{
  const Employee = sequelize.define('EmployeesMindInventory', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        customValidator(value) {
          // if (value === null && this.age !== 10) {
          //   throw new Error("name can't be null unless age is 10");
          // }
          if (value.length < 5) {
            throw new Error("frist name should be atleast 8 charecters");
          }
        }
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull:false
    },
    position: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      isEmail: {
          msg: 'Text should be email type'
      },
    },
    password:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    salary: {
      type: DataTypes.STRING,
      allowNull: false
    },
    totalAvailableLeave: {
      type: DataTypes.NUMBER,
      allowNull: false
    }
  }, {
    // freezeTableName: true,
    // sequelize, //for creating instance here
    tableName: 'EmployeesMindInventory',
    timestamps: true,
    updatedAt: 'updateTimestamp'
  });
  return Employee
}
