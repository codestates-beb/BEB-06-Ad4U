var DataTypes = require("sequelize").DataTypes;
var _Advertisement = require("./Advertisement");
var _Advertisement_has_Supplier = require("./Advertisement_has_Supplier");
var _Client = require("./Client");
var _Client_has_Supplier = require("./Client_has_Supplier");
var _Supplier = require("./Supplier");

function initModels(sequelize) {
  var Advertisement = _Advertisement(sequelize, DataTypes);
  var Advertisement_has_Supplier = _Advertisement_has_Supplier(sequelize, DataTypes);
  var Client = _Client(sequelize, DataTypes);
  var Client_has_Supplier = _Client_has_Supplier(sequelize, DataTypes);
  var Supplier = _Supplier(sequelize, DataTypes);

  Advertisement.belongsToMany(Supplier, { as: 'Supplier_id_Suppliers', through: Advertisement_has_Supplier, foreignKey: "Advertisement_id", otherKey: "Supplier_id" });
  Supplier.belongsToMany(Advertisement, { as: 'Advertisement_id_Advertisements', through: Advertisement_has_Supplier, foreignKey: "Supplier_id", otherKey: "Advertisement_id" });
  Advertisement_has_Supplier.belongsTo(Advertisement, { as: "Advertisement", foreignKey: "Advertisement_id"});
  Advertisement.hasMany(Advertisement_has_Supplier, { as: "Advertisement_has_Suppliers", foreignKey: "Advertisement_id"});
  Client_has_Supplier.belongsTo(Advertisement, { as: "Advertisement", foreignKey: "Advertisement_id"});
  Advertisement.hasMany(Client_has_Supplier, { as: "Client_has_Suppliers", foreignKey: "Advertisement_id"});
  Advertisement.belongsTo(Client, { as: "Client", foreignKey: "Client_id"});
  Client.hasMany(Advertisement, { as: "Advertisements", foreignKey: "Client_id"});
  Client_has_Supplier.belongsTo(Client, { as: "Client", foreignKey: "Client_id"});
  Client.hasMany(Client_has_Supplier, { as: "Client_has_Suppliers", foreignKey: "Client_id"});
  Advertisement_has_Supplier.belongsTo(Supplier, { as: "Supplier", foreignKey: "Supplier_id"});
  Supplier.hasMany(Advertisement_has_Supplier, { as: "Advertisement_has_Suppliers", foreignKey: "Supplier_id"});
  Client_has_Supplier.belongsTo(Supplier, { as: "Supplier", foreignKey: "Supplier_id"});
  Supplier.hasMany(Client_has_Supplier, { as: "Client_has_Suppliers", foreignKey: "Supplier_id"});

  return {
    Advertisement,
    Advertisement_has_Supplier,
    Client,
    Client_has_Supplier,
    Supplier,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
