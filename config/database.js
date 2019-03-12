const Sequelize = require('sequelize');

module.exports = new Sequelize('library', 'username', 'password', {
  host: 'localhost',
  dialect: 'sqlite',
  operatorsAliases: false,
  storage: './library.db'
});


