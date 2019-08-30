'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    userId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    price: DataTypes.STRING,
    description: DataTypes.STRING,
    imagePath: DataTypes.STRING
  }, {
    tableName: 'products',
    // timestamps: false
  });
  Product.associate = function(models) {
    // associations can be defined here

  };
  return Product;
};