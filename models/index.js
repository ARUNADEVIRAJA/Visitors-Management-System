const fs = require('fs');
const path = require('path');
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('VMS', 'postgres', 'aruna@476', {
  host: 'localhost',
  dialect: 'postgres',
});
const db = {};
const modelsPath = __dirname;
fs.readdirSync(modelsPath)
  .filter(file => file !== 'index.js' && file.endsWith('.js'))
  .forEach(file => {
    const model = require(path.join(modelsPath, file))(sequelize);
    db[model.name] = model;
  });
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;