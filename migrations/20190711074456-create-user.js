'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
      },
      password: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      isActive: {
        type: Sequelize.ENUM,
        allowNull: false,
        values: ['active', 'pending', 'deleted'],
      },
      role: {
        type: Sequelize.ENUM,
        allowNull: false,
        values: ['member', 'admin'],
      },
      imagePath: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null
      },
      address: {
        type: Sequelize.TEXT,
        allowNull: true,
        defaultValue: null
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true,
        defaultValue: null
      },
      latitude: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null
      },
      longitude: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null
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
    return queryInterface.dropTable('users');
  }
};