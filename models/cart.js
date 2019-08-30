'use strict';
module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define('Cart', {
    userId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER
  }, {
    tableName: 'carts',
    // timestamps: false
  });
  Cart.associate = function(models) {
    // associations can be defined here
    Cart.belongsTo(models.Product, {as: 'product'});
  };
  return Cart;
};