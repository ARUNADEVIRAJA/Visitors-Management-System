const { DataTypes } = require('sequelize')

module.exports = sequelize => {
  const UserRole = sequelize.define('UserRole', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
     name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.INTEGER,
      defaultValue: 1 //default to 1, active--1, inactive--2
    }
  })

  UserRole.associate = models => {
    UserRole.hasMany(models.User)
  }
  return UserRole
}
