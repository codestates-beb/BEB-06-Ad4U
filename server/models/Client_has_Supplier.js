const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Client_has_Supplier', {
    Client_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Client',
        key: 'id'
      }
    },
    Supplier_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Supplier',
        key: 'id'
      }
    },
    Advertisement_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Advertisement',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'Client_has_Supplier',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Client_id" },
          { name: "Supplier_id" },
          { name: "Advertisement_id" },
        ]
      },
      {
        name: "fk_Client_has_Supplier_Supplier1_idx",
        using: "BTREE",
        fields: [
          { name: "Supplier_id" },
        ]
      },
      {
        name: "fk_Client_has_Supplier_Client1_idx",
        using: "BTREE",
        fields: [
          { name: "Client_id" },
        ]
      },
      {
        name: "fk_Client_has_Supplier_Advertisement1_idx",
        using: "BTREE",
        fields: [
          { name: "Advertisement_id" },
        ]
      },
    ]
  });
};
