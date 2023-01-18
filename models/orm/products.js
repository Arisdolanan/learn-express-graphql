'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.categories, {
        foreignKey: "categories_id",
        as: "v_categories",
      });

      this.belongsTo(models.mst_users, {
        foreignKey: "user_id",
        as: "v_mst_users",
      });
    }
  };
  products.init({
    categories_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    purchase_price: DataTypes.INTEGER,
    sell_price: DataTypes.INTEGER,
    stock: DataTypes.INTEGER,
    size: DataTypes.STRING,
    variant: DataTypes.STRING,
    description: DataTypes.STRING,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'products',
  });
  return products;
};