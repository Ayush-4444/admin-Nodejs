const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('Admin', 'signity', 'root', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;