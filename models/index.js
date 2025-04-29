const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('VMS', 'postgres', 'aruna@476', {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = sequelize;

