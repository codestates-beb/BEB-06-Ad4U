const initModels = require("../models/init-models");
const Sequelize = require('sequelize');

const config = require(__dirname + '/../config/config.js')

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
  logging: false,
  timezone: "+09:00"
});
const models = initModels(sequelize);

module.exports = models;
