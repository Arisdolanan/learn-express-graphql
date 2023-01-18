"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class mst_users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.mst_role, {
        foreignKey: "role_id",
        as: "v_role",
      });
    }
  }
  mst_users.init(
    {
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      fullname: DataTypes.STRING,
      role_id: DataTypes.INTEGER,
      email: DataTypes.STRING,
      phone: DataTypes.STRING,
      company: DataTypes.STRING,
      position: DataTypes.STRING,
      address: DataTypes.TEXT,
      created_by: DataTypes.INTEGER,
      last_login: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "mst_users",
    }
  );

  return mst_users;
};
