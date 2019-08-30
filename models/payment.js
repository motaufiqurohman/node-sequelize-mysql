'use strict';
module.exports = (sequelize, DataTypes) => {
  const Payment = sequelize.define('Payment', {
    userId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    sumPrice: DataTypes.STRING,
    paymentCode: DataTypes.INTEGER,
    dateCheckout: DataTypes.DATE,
    paymentExpiredIn: DataTypes.DATE,
    datePayment: DataTypes.DATE,
    statusPayment: DataTypes.STRING
  }, {
    tableName: 'payments',
    // timestamps: false
  });
  Payment.associate = function(models) {
    // associations can be defined here
  };
  return Payment;
};