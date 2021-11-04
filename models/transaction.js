"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      transaction.belongsTo(models.user, {
        foreignKey: {
          as: "user",
          name: "userId",
        },
      });

      transaction.belongsTo(models.trip, {
        foreignKey: {
          as: "trip",
          name: "tripId",
        },
      });
    }
  }
  transaction.init(
    {
      userId: DataTypes.INTEGER,
      tripId: DataTypes.INTEGER,
      counterQty: DataTypes.INTEGER,
      total: DataTypes.INTEGER,
      status: DataTypes.STRING,
      attachment: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "transaction",
    }
  );
  return transaction;
};
