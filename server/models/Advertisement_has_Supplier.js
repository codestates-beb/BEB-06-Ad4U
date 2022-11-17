const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Advertisement_has_Supplier', {
    Advertisement_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Advertisement',
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
    }
  }, {
    sequelize,
    tableName: 'Advertisement_has_Supplier',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Advertisement_id" },
          { name: "Supplier_id" },
        ]
      },
      {
        name: "fk_Advertisement_has_Supplier_Supplier1_idx",
        using: "BTREE",
        fields: [
          { name: "Supplier_id" },
        ]
      },
      {
        name: "fk_Advertisement_has_Supplier_Advertisement1_idx",
        using: "BTREE",
        fields: [
          { name: "Advertisement_id" },
        ]
      },
    ]
  });
};
