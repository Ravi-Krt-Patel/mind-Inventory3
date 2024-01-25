const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) =>{
  const Deparment = sequelize.define('DeparmentMindInventory', {
    department_Id:{
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    department_name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    manager_Id: {
        type: DataTypes.NUMBER,
        allowNull: false
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false
    }
  }, {
    tableName: 'DeparmentMindInventory',
    timestamps: true,
    updatedAt: 'updateTimestamp'
  });
  return Deparment
}
