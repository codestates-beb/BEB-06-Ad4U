const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Advertisement', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Client_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Client',
        key: 'id'
      }
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    title: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    content: {
      type: DataTypes.STRING(3000),
      allowNull: true
    },
    cost: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    AdImgUrl: {
      type: DataTypes.STRING(300),
      allowNull: true
    },
    multisigAddress: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    token_uri: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    token_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    token_address: {
      type: DataTypes.STRING(100),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Advertisement',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
          { name: "Client_id" },
        ]
      },
      {
        name: "fk_ad4u_Client1_idx",
        using: "BTREE",
        fields: [
          { name: "Client_id" },
        ]
      },
    ]
  });
};
