const initModels = require("../models/init-models");
const Sequelize = require('sequelize');

const config = require(__dirname + '/../config/config.js')

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: process.env.DB_HOST,
  dialect: "mysql",
  logging: false
});
const models = initModels(sequelize);

module.exports = models;
