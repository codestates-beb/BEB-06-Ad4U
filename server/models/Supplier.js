const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Supplier', {
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
    email: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    address: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    channelName: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    subscriberCount: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    viewCount: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    profileImgUrl: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    channelUrl: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    channel_id: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    refreshToken: {
      type: DataTypes.STRING(200),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Supplier',
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
