const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Client', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    userId: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    password: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    company_name: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    company_number: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(45),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Client',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
