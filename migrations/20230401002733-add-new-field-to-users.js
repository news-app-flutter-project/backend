"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Change the data type of the id column to integer
    await queryInterface.changeColumn("news", "id", {
      type: Sequelize.INTEGER.UNSIGNED,
      autoIncrement: true,
      allowNull: false,
    });

    // Add a primary key constraint to the id column
    await queryInterface.addConstraint("news", {
      type: "primary key",
      fields: ["id"],
      name: "news_pk",
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Remove the primary key constraint from the id column
    await queryInterface.removeConstraint("news", "news_pk");

    // Change the data type of the id column back to string
    await queryInterface.changeColumn("news", "id", {
      type: Sequelize.STRING(36),
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    });
  },
};
