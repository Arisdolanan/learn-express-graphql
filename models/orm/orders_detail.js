'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class orders_detail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.orders, {
        foreignKey: "orders_id",
        as: "v_orders",
      });
      this.belongsTo(models.products, {
        foreignKey: "products_id",
        as: "v_products",
      });
    }
  };
  orders_detail.init({
    orders_id: DataTypes.INTEGER,
    products_id: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'orders_detail',
  });
  return orders_detail;
};