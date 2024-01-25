const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) =>{
  const Leave = sequelize.define('LeaveMindInventory', {
    leave_Id:{
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    employee_Id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    leave_type: {
      type: DataTypes.STRING,
      allowNull:false
    },
    duration: {
      type: DataTypes.NUMBER,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'pending'
    },
    reasion:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    manager_id: {
        type: DataTypes.NUMBER,
        allowNull: false
    }
  }, {
    tableName: 'LeaveMindInventory',
    timestamps: true,
    updatedAt: 'updateTimestamp'
  });
  return Leave
}
