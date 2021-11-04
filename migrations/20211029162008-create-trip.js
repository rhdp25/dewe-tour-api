"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("trips", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      countryId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "countries",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      accomodation: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      transportation: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      eat: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      day: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      night: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      dateTrip: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      price: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      quota: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      description: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      image: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("trips");
  },
};
