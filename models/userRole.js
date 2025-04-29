// models/userRole.js
const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const UserRole = sequelize.define('UserRole', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  status: {
    type: DataTypes.INTEGER, 
    defaultValue: 1 // Default to 1 , active--1, inactive--2
  },  
});
UserRole.associate = (models) => {
  UserRole.hasMany(models.User);
};
module.exports = { UserRole};
