const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) =>{
  const Leave = sequelize.define('LeaveMindInventory', {
    leave_Id:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    leave_employee_Id: {
        type: DataTypes.STRING,
        references: {
          model: 'EmployeesMindInventory', // name of the referenced model
          key: 'employee_Id',         // name of the referenced column
        },
    },
    total_provided_leave: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    total_taken_leave: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    total_availble_leave: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
  }, {
    tableName: 'LeaveMindInventory',
    timestamps: true,
    updatedAt: 'updateTimestamp'
  });
  return Leave
}
