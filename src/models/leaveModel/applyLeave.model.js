const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) =>{
  const ApplyLeave = sequelize.define('ApplyLeaveMindInventory', {
    apply_leave_Id:{
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    employee_Id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    leave_type: {
      type: DataTypes.STRING,
      allowNull:false
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
        type: DataTypes.STRING,
        allowNull: false
    },
    approval: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    rejection: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
  }, {
    tableName: 'ApplyLeaveMindInventory',
    timestamps: true,
    updatedAt: 'updateTimestamp'
  });
  return ApplyLeave
}
