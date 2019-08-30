'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    imagePath: DataTypes.STRING,
    address: DataTypes.STRING,
    phone: DataTypes.STRING,
    latitude: DataTypes.STRING,
    longitude: DataTypes.STRING,
    isActive: DataTypes.STRING,
    role: DataTypes.STRING
  }, {
    tableName: 'users',
    // timestamps: false
  });
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Product, {foreignKey: 'userId', as: 'products'});
    User.hasMany(models.Cart, {foreignKey: 'userId', as: 'carts'});
  };
  return User;
};