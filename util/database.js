const Sequelize = require('sequelize');

const sequelize = new Sequelize('new_schema', 'root', 'password', {
  dialect: 'mysql',
  host: 'localhost',
});

module.exports = sequelize;
