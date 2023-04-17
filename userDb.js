const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('Admin', 'root', 'Toor!!!123', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;