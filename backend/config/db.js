const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
  logging: false, // Desactivar logs para mantener la consola limpia
});

module.exports = sequelize;
