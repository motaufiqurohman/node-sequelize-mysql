'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('payments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER, // dont forget to changes the type
        references: {
          model: 'users', // name of table maybe
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false
      },
      productId: {
        type: Sequelize.INTEGER, // dont forget to changes the type
        references: {
          model: 'products', // name of table maybe
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      sumPrice: {
        type: Sequelize.STRING,
        allowNull: false
      },
      paymentCode: {
        type: Sequelize.STRING,
        allowNull: false
      },
      dateCheckout: {
        type: Sequelize.DATE,
        allowNull: false
      },
      paymentExpiredIn: {
        type: Sequelize.DATE,
        allowNull: false
      },
      datePayment: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: null
      },
      statusPayment:{
        type: Sequelize.ENUM,
        allowNull: false,
        values: ['on proccess', 'done', 'expired'],
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('payments');
  }
};